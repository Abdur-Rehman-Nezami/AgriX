import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, IconButton, CircularProgress } from '@mui/material';
import { VolumeUp, Stop } from '@mui/icons-material';
import API from '../utils/api';

export default function AICard({ weather }) {
  const [suggestion, setSuggestion] = useState('');
  const [crop, setCrop] = useState('Wheat');
  const [loadingAI, setLoadingAI] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getAISuggestion = async () => {
    setLoadingAI(true);
    try {
      const { data } = await API.post('/weather/ai-suggestion', { 
        weather: { temp: weather?.main?.temp || 25, humidity: weather?.main?.humidity || 60 }, 
        crop 
      });
      setSuggestion(data.suggestion);
    } catch (error) {
      setSuggestion('Based on current conditions, maintain regular watering schedule and monitor crop health regularly.');
    }
    setLoadingAI(false);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: 3, height: '100%', background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}>
      <CardContent sx={{ p: 4 }}>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          🤖 AI Farming Suggestions
        </h3>
        
        {/* Crop Input */}
        <TextField 
          fullWidth 
          size="medium" 
          label="Your Crop" 
          value={crop} 
          onChange={(e) => setCrop(e.target.value)} 
          sx={{ 
            mb: 3,
            bgcolor: 'white',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': { borderRadius: '12px' }
          }} 
        />
        
        <Button 
          fullWidth 
          variant="contained" 
          onClick={getAISuggestion} 
          disabled={loadingAI}
          sx={{ 
            bgcolor: '#042E25', 
            color: '#fff', 
            '&:hover': { bgcolor: '#064E3B' }, 
            borderRadius: '12px', 
            mb: 3,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          {loadingAI ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Get AI Suggestion'}
        </Button>

        {/* AI Suggestion Display */}
        {suggestion && (
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg relative">
            <div className="flex justify-between items-start mb-3">
              <p className="font-bold text-lg text-gray-900">💡 AI Recommendation:</p>
              <IconButton 
                onClick={() => speakText(suggestion)}
                sx={{ 
                  bgcolor: isSpeaking ? '#EF4444' : '#042E25',
                  color: 'white',
                  '&:hover': { bgcolor: isSpeaking ? '#DC2626' : '#064E3B' },
                  width: 40,
                  height: 40
                }}
                title={isSpeaking ? 'Stop reading' : 'Read aloud'}
              >
                {isSpeaking ? <Stop /> : <VolumeUp />}
              </IconButton>
            </div>
            <p className="text-gray-800 leading-relaxed">{suggestion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
