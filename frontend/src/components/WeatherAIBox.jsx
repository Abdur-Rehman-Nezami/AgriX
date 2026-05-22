import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, TextField, IconButton, CircularProgress } from '@mui/material';
import { MyLocation, VolumeUp, Stop } from '@mui/icons-material';
import API from '../utils/api';

export default function WeatherAIBox() {
  const [weather, setWeather] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [city, setCity] = useState('Lahore');
  const [crop, setCrop] = useState('Wheat');
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async (useGPS = false) => {
    setLoadingWeather(true);
    try {
      if (useGPS) {
        // Get user's GPS location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const { data } = await API.get('/weather', { 
              params: { lat: latitude, lon: longitude } 
            });
            setWeather(data);
            setCity(data.name);
            setLoadingWeather(false);
          },
          (error) => {
            console.error('GPS error:', error);
            alert('Unable to get your location. Please search for a city manually.');
            setLoadingWeather(false);
          }
        );
      } else {
        const { data } = await API.get('/weather', { params: { city } });
        setWeather(data);
        setLoadingWeather(false);
      }
    } catch (error) {
      console.error('Failed to fetch weather');
      setLoadingWeather(false);
    }
  };

  const getAISuggestion = async () => {
    setLoadingAI(true);
    try {
      const { data } = await API.post('/weather/ai-suggestion', { 
        weather: { temp: weather.main.temp, humidity: weather.main.humidity }, 
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
    <div className="mb-8">
      {/* Weather Card - Full Width */}
      <Card sx={{ borderRadius: '24px', boxShadow: 3, mb: 4, background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}>
        <CardContent sx={{ p: 4 }}>
          <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            🌤️ Weather Insights
          </h3>
          
          {/* City Search and GPS */}
          <div className="flex gap-2 mb-6">
            <TextField 
              size="small" 
              label="Search City" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchWeather(false)}
              sx={{ 
                flex: 1,
                bgcolor: 'white',
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': { borderRadius: '12px' }
              }}
            />
            <Button 
              variant="contained" 
              onClick={() => fetchWeather(false)}
              disabled={loadingWeather}
              sx={{ 
                bgcolor: '#042E25', 
                '&:hover': { bgcolor: '#064E3B' },
                borderRadius: '12px',
                px: 3
              }}
            >
              Search
            </Button>
            <IconButton 
              onClick={() => fetchWeather(true)}
              disabled={loadingWeather}
              sx={{ 
                bgcolor: 'white',
                '&:hover': { bgcolor: '#f0f0f0' },
                borderRadius: '12px'
              }}
              title="Use my location"
            >
              <MyLocation sx={{ color: '#042E25' }} />
            </IconButton>
          </div>

          {/* Weather Display */}
          {loadingWeather ? (
            <div className="text-center py-8">
              <CircularProgress sx={{ color: '#042E25' }} />
            </div>
          ) : weather ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Location</p>
                  <p className="text-2xl font-bold text-gray-900">{weather.name}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Temperature</p>
                  <p className="text-2xl font-bold text-gray-900">{weather.main.temp}°C</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Humidity</p>
                  <p className="text-2xl font-bold text-gray-900">{weather.main.humidity}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Condition</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{weather.weather[0].description}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-700">Loading weather data...</p>
          )}
        </CardContent>
      </Card>

      {/* AI Suggestion Card - Full Width */}
      <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}>
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
            disabled={loadingAI || !weather}
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
    </div>
  );
}
