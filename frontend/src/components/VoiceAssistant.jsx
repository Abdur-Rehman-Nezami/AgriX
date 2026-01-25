import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Button, CircularProgress, Card, Avatar } from '@mui/material';
import { Mic, Stop, VolumeUp, Close, Send } from '@mui/icons-material';
import API from '../utils/api';

export default function VoiceAssistant({ open, onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState([]);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ur-PK'; // Urdu language

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsListening(false);
        processQuery(text);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'no-speech') {
          alert('کوئی آواز نہیں سنی گئی۔ براہ کرم دوبارہ کوشش کریں۔');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setResponse('');
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert('آپ کا براؤزر آواز کی شناخت کی سہولت فراہم نہیں کرتا۔');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processQuery = async (text) => {
    setLoading(true);
    try {
      const { data } = await API.post('/voice/query', {
        text,
        language: 'urdu'
      });

      setResponse(data.response);

      // Add to conversation
      setConversation(prev => [
        ...prev,
        { type: 'user', text },
        { type: 'assistant', text: data.response }
      ]);

      // Speak the response
      speakText(data.response);
    } catch (error) {
      console.error('Failed to process query:', error);
      const errorMsg = 'معذرت، کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔';
      setResponse(errorMsg);
    }
    setLoading(false);
  };

  const speakText = async (text) => {
    if (!text || text.trim() === '') {
      console.log('No text to speak');
      return;
    }

    // Check if text contains Urdu characters
    const hasUrdu = /[\u0600-\u06FF]/.test(text);
    console.log('Text has Urdu characters:', hasUrdu);

    if (hasUrdu) {
      // Use Google Translate TTS for Urdu text
      try {
        setIsSpeaking(true);

        // Encode text for URL
        const encodedText = encodeURIComponent(text);

        // Google Translate TTS API (unofficial but works)
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ur&client=tw-ob&q=${encodedText}`;

        // Create audio element
        const audio = new Audio(audioUrl);

        audio.onplay = () => {
          console.log('✅ Audio started playing');
        };

        audio.onended = () => {
          console.log('✅ Audio ended');
          setIsSpeaking(false);
        };

        audio.onerror = (error) => {
          console.error('❌ Audio error:', error);
          setIsSpeaking(false);
          // Fallback to browser TTS
          speakWithBrowserTTS(text);
        };

        // Play audio
        await audio.play();
        console.log('🔊 Playing Urdu audio via Google Translate');

      } catch (error) {
        console.error('Error with Google TTS:', error);
        setIsSpeaking(false);
        // Fallback to browser TTS
        speakWithBrowserTTS(text);
      }
    } else {
      // Use browser TTS for English text
      speakWithBrowserTTS(text);
    }
  };

  const speakWithBrowserTTS = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('آپ کا براؤزر ٹیکسٹ ٹو اسپیچ سپورٹ نہیں کرتا۔\nYour browser does not support text-to-speech.');
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Small delay to ensure cancellation is complete
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);

        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);

        // Try to find best voice
        let selectedVoice = voices.find(voice =>
          voice.lang.toLowerCase().includes('en-us') ||
          voice.lang.toLowerCase().includes('en-gb')
        );

        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.lang = selectedVoice.lang;
          console.log('✅ Using voice:', selectedVoice.name);
        }

        // Set speech parameters
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Event handlers
        utterance.onstart = () => {
          console.log('✅ Speech started');
          setIsSpeaking(true);
        };

        utterance.onend = () => {
          console.log('✅ Speech ended');
          setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
          console.error('❌ Speech error:', event.error);
          setIsSpeaking(false);
        };

        // Speak the text
        console.log('🔊 Speaking with browser TTS');
        window.speechSynthesis.speak(utterance);

      }, 100);

    } catch (error) {
      console.error('Exception in speakWithBrowserTTS:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '24px', minHeight: '600px' }
      }}
    >
      <DialogTitle sx={{
        fontSize: '1.8rem',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>🎤 آواز سے مدد (Voice Assistant)</span>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Conversation History */}
        <div
          className="flex-1 overflow-y-auto space-y-3 p-4 rounded-2xl"
          style={{
            backgroundColor: '#F9FAFB',
            minHeight: '300px',
            maxHeight: '400px'
          }}
        >
          {conversation.length === 0 ? (
            <div className="text-center py-12">
              <Mic sx={{ fontSize: 80, color: '#3B82F6', mb: 2 }} />
              <p className="text-gray-600 text-lg">مائیکروفون بٹن دبائیں اور اپنا سوال پوچھیں</p>
              <p className="text-gray-500 text-sm mt-2">Press the microphone button and ask your question</p>
            </div>
          ) : (
            conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {msg.type === 'assistant' && (
                    <Avatar sx={{ bgcolor: '#3B82F6', width: 32, height: 32 }}>
                      🤖
                    </Avatar>
                  )}
                  <Card
                    sx={{
                      p: 2,
                      bgcolor: msg.type === 'user' ? '#3B82F6' : 'white',
                      color: msg.type === 'user' ? 'white' : 'black',
                      borderRadius: '16px',
                      boxShadow: 2
                    }}
                  >
                    <p className="text-sm" style={{ direction: 'rtl', textAlign: 'right' }}>
                      {msg.text}
                    </p>
                  </Card>
                  {msg.type === 'user' && (
                    <Avatar sx={{ bgcolor: '#10B981', width: 32, height: 32 }}>
                      👤
                    </Avatar>
                  )}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <Card sx={{ p: 2, bgcolor: 'white', borderRadius: '16px', boxShadow: 2 }}>
                <CircularProgress size={20} />
              </Card>
            </div>
          )}
        </div>

        {/* Current Transcript */}
        {transcript && (
          <Card sx={{ p: 2, bgcolor: '#DBEAFE', borderRadius: '16px' }}>
            <p className="text-sm font-semibold text-gray-700">آپ نے کہا:</p>
            <p className="text-base" style={{ direction: 'rtl', textAlign: 'right' }}>
              {transcript}
            </p>
          </Card>
        )}

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          {!isListening ? (
            <Button
              variant="contained"
              size="large"
              startIcon={<Mic />}
              onClick={startListening}
              disabled={loading}
              sx={{
                bgcolor: '#3B82F6',
                '&:hover': { bgcolor: '#2563EB' },
                borderRadius: '16px',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              بولیں (Speak)
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={<Stop />}
              onClick={stopListening}
              sx={{
                bgcolor: '#EF4444',
                '&:hover': { bgcolor: '#DC2626' },
                borderRadius: '16px',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                animation: 'pulse 1.5s infinite'
              }}
            >
              رکیں (Stop)
            </Button>
          )}

          {response && !isSpeaking && (
            <Button
              variant="contained"
              size="large"
              startIcon={<VolumeUp />}
              onClick={() => speakText(response)}
              sx={{
                bgcolor: '#10B981',
                '&:hover': { bgcolor: '#059669' },
                borderRadius: '16px',
                px: 4,
                py: 2,
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              سنیں (Listen)
            </Button>
          )}

          {isSpeaking && (
            <Button
              variant="contained"
              size="large"
              startIcon={<Stop />}
              onClick={stopSpeaking}
              sx={{
                bgcolor: '#EF4444',
                '&:hover': { bgcolor: '#DC2626' },
                borderRadius: '16px',
                px: 4,
                py: 2,
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              بند کریں (Stop)
            </Button>
          )}
        </div>

        {/* Instructions */}
        <Card sx={{ p: 2, bgcolor: '#FEF3C7', borderRadius: '16px' }}>
          <p className="text-sm text-gray-700" style={{ direction: 'rtl', textAlign: 'right' }}>
            💡 <strong>ہدایات:</strong> مائیکروفون بٹن دبائیں، اپنا سوال اردو میں پوچھیں، اور جواب سنیں۔
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Instructions: Press microphone, ask your question in Urdu, and listen to the answer.
          </p>
          <Button
            size="small"
            variant="outlined"
            onClick={() => speakText('یہ ایک ٹیسٹ ہے۔ اگر آپ یہ سن رہے ہیں تو اسپیکر کام کر رہا ہے۔')}
            sx={{ mt: 2, fontSize: '0.75rem' }}
          >
            🔊 Test Speaker (اسپیکر ٹیسٹ کریں)
          </Button>
          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-700">
              <strong>⚠️ Note:</strong> If only numbers are spoken, your system may not have Urdu voice installed.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              <strong>Windows:</strong> Settings → Time & Language → Speech → Add voices → Download Urdu/Hindi voice
            </p>
            <p className="text-xs text-gray-600">
              <strong>Chrome:</strong> Uses system voices. Install from Windows/Mac settings.
            </p>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
