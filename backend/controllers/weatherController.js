import axios from 'axios';

export const getWeather = async (req, res) => {
  try {
    const { city = 'Lahore' } = req.query;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},PK&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Weather data unavailable' });
  }
};

export const getAISuggestion = async (req, res) => {
  try {
    const { weather, crop } = req.body;
    
    const prompt = `Based on weather: temp ${weather.temp}°C, humidity ${weather.humidity}%, and crop: ${crop}, give a brief farming suggestion in 1-2 sentences.`;
    
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'openai/gpt-4',
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ suggestion: response.data.choices[0].message.content });
  } catch (error) {
    res.json({ suggestion: 'Based on current conditions, maintain regular watering schedule and monitor for pests.' });
  }
};
