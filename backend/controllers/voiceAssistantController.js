import axios from 'axios';

// Process voice query and get AI response
export const processVoiceQuery = async (req, res) => {
  try {
    const { text, language = 'urdu' } = req.body;
    
    console.log('Received voice query:', text);
    
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    // Try OpenRouter API first
    try {
      console.log('Calling OpenRouter API...');
      
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful agricultural advisor for Pakistani farmers. Provide practical farming advice in simple Urdu language. Keep responses concise and actionable.'
            },
            {
              role: 'user',
              content: `Farmer's question: ${text}\n\nPlease answer in Urdu (اردو میں جواب دیں):`
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5001',
            'X-Title': 'AgroSmart Voice Assistant'
          },
          timeout: 10000
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      console.log('AI Response received:', aiResponse.substring(0, 100));

      return res.json({
        query: text,
        response: aiResponse,
        language
      });
    } catch (apiError) {
      console.error('OpenRouter API error:', apiError.response?.data || apiError.message);
      
      // Use intelligent fallback based on keywords
      let fallbackResponse = generateFallbackResponse(text, language);
      
      return res.json({
        query: text,
        response: fallbackResponse,
        language,
        fallback: true
      });
    }
  } catch (error) {
    console.error('Voice assistant error:', error.message);
    
    const errorResponse = req.body.language === 'urdu'
      ? 'معذرت، کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔'
      : 'Sorry, something went wrong. Please try again.';
    
    res.json({
      query: req.body.text,
      response: errorResponse,
      language: req.body.language || 'urdu',
      error: true
    });
  }
};

// Generate intelligent fallback responses
function generateFallbackResponse(text, language) {
  const lowerText = text.toLowerCase();
  
  // Pest/Disease related
  if (lowerText.includes('کیڑے') || lowerText.includes('pest') || lowerText.includes('disease') || lowerText.includes('بیماری')) {
    return language === 'urdu'
      ? 'کیڑوں اور بیماریوں کے لیے: 1) فصل کا باقاعدہ معائنہ کریں 2) مناسب کیڑے مار دوا استعمال کریں 3) متاثرہ پودوں کو الگ کریں 4) صاف ستھرائی کا خیال رکھیں۔ مزید مدد کے لیے مقامی زرعی افسر سے رابطہ کریں۔'
      : 'For pests and diseases: 1) Regularly inspect crops 2) Use appropriate pesticides 3) Isolate affected plants 4) Maintain cleanliness. Contact local agricultural officer for more help.';
  }
  
  // Fertilizer related
  if (lowerText.includes('کھاد') || lowerText.includes('fertilizer') || lowerText.includes('nutrient')) {
    return language === 'urdu'
      ? 'کھاد کے لیے: 1) مٹی کا ٹیسٹ کروائیں 2) NPK کھاد متوازن مقدار میں استعمال کریں 3) نامیاتی کھاد بھی شامل کریں 4) پانی دینے کے بعد کھاد ڈالیں۔ زیادہ کھاد نقصان دہ ہو سکتی ہے۔'
      : 'For fertilizer: 1) Get soil tested 2) Use balanced NPK fertilizer 3) Include organic fertilizer 4) Apply after watering. Too much fertilizer can be harmful.';
  }
  
  // Irrigation related
  if (lowerText.includes('پانی') || lowerText.includes('water') || lowerText.includes('irrigation') || lowerText.includes('آبپاشی')) {
    return language === 'urdu'
      ? 'آبپاشی کے لیے: 1) صبح یا شام کے وقت پانی دیں 2) زیادہ پانی سے بچیں 3) ڈرپ سسٹم بہتر ہے 4) موسم اور فصل کی ضرورت کے مطابق پانی دیں۔ پانی کی بچت ضروری ہے۔'
      : 'For irrigation: 1) Water in morning or evening 2) Avoid overwatering 3) Drip system is better 4) Water according to season and crop needs. Water conservation is important.';
  }
  
  // Weather related
  if (lowerText.includes('موسم') || lowerText.includes('weather') || lowerText.includes('rain') || lowerText.includes('بارش')) {
    return language === 'urdu'
      ? 'موسم کی معلومات کے لیے: 1) موسم کی پیشن گوئی چیک کریں 2) بارش سے پہلے نکاسی کا بندوبست کریں 3) سخت موسم میں فصل کی حفاظت کریں 4) موسم کے مطابق فصل کا انتخاب کریں۔'
      : 'For weather information: 1) Check weather forecast 2) Arrange drainage before rain 3) Protect crops in harsh weather 4) Choose crops according to season.';
  }
  
  // Default response
  return language === 'urdu'
    ? 'آپ کے سوال کے لیے: زراعت میں کامیابی کے لیے 1) باقاعدہ دیکھ بھال 2) صحیح وقت پر کام 3) معیاری بیج اور کھاد 4) ماہرین سے مشورہ ضروری ہے۔ مزید تفصیل کے لیے اپنے علاقے کے زرعی افسر سے رابطہ کریں۔'
    : 'For your question: For farming success 1) Regular maintenance 2) Timely work 3) Quality seeds and fertilizer 4) Expert consultation is necessary. Contact your local agricultural officer for more details.';
}

// Get conversation history
export const getConversationHistory = async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
