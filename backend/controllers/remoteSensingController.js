import axios from 'axios';

// Analyze remote sensing data with AI
export const analyzeRemoteSensingData = async (req, res) => {
  try {
    const { 
      dataType, // 'ndvi', 'ndwi', 'soil-moisture', 'temperature', 'custom'
      values,
      crop,
      region,
      date,
      description
    } = req.body;

    console.log('Analyzing remote sensing data:', dataType);

    if (!dataType || !values) {
      return res.status(400).json({ message: 'Data type and values are required' });
    }

    // Prepare context for AI analysis
    const analysisPrompt = buildAnalysisPrompt(dataType, values, crop, region, date, description);

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert agricultural remote sensing analyst. Analyze satellite/drone data and provide actionable insights for farmers in Urdu. Focus on practical recommendations.'
            },
            {
              role: 'user',
              content: analysisPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 400
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5001',
            'X-Title': 'AgroSmart Remote Sensing'
          },
          timeout: 15000
        }
      );

      const analysis = response.data.choices[0].message.content;
      console.log('AI Analysis completed');

      // Generate recommendations based on data type
      const recommendations = generateRecommendations(dataType, values);

      res.json({
        dataType,
        analysis,
        recommendations,
        summary: generateSummary(dataType, values),
        timestamp: new Date()
      });
    } catch (apiError) {
      console.error('OpenRouter API error:', apiError.response?.data || apiError.message);
      
      // Fallback analysis
      const fallbackAnalysis = generateFallbackAnalysis(dataType, values, crop);
      
      res.json({
        dataType,
        analysis: fallbackAnalysis,
        recommendations: generateRecommendations(dataType, values),
        summary: generateSummary(dataType, values),
        fallback: true,
        timestamp: new Date()
      });
    }
  } catch (error) {
    console.error('Remote sensing analysis error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Build analysis prompt based on data type
function buildAnalysisPrompt(dataType, values, crop, region, date, description) {
  const dataInfo = {
    'ndvi': 'NDVI (Normalized Difference Vegetation Index)',
    'ndwi': 'NDWI (Normalized Difference Water Index)',
    'soil-moisture': 'Soil Moisture',
    'temperature': 'Surface Temperature',
    'custom': 'Custom Remote Sensing Data'
  };

  let prompt = `Remote Sensing Data Analysis:\n\n`;
  prompt += `Data Type: ${dataInfo[dataType] || dataType}\n`;
  prompt += `Values: ${JSON.stringify(values)}\n`;
  if (crop) prompt += `Crop: ${crop}\n`;
  if (region) prompt += `Region: ${region}\n`;
  if (date) prompt += `Date: ${date}\n`;
  if (description) prompt += `Additional Info: ${description}\n`;
  
  prompt += `\nPlease provide:\n`;
  prompt += `1. Analysis of the data in Urdu (اردو میں تجزیہ)\n`;
  prompt += `2. What these values indicate about crop health\n`;
  prompt += `3. Specific actions the farmer should take\n`;
  prompt += `4. Any warnings or concerns\n`;
  prompt += `\nProvide response in Urdu language.`;

  return prompt;
}

// Generate recommendations based on data
function generateRecommendations(dataType, values) {
  const recommendations = [];

  if (dataType === 'ndvi') {
    const avgNDVI = Array.isArray(values) ? 
      values.reduce((a, b) => a + b, 0) / values.length : values;
    
    if (avgNDVI < 0.2) {
      recommendations.push({
        priority: 'high',
        title: 'کم پودوں کی صحت (Low Vegetation Health)',
        action: 'فوری طور پر کھاد اور پانی کی جانچ کریں'
      });
    } else if (avgNDVI < 0.4) {
      recommendations.push({
        priority: 'medium',
        title: 'درمیانی پودوں کی صحت (Moderate Health)',
        action: 'باقاعدہ نگرانی جاری رکھیں'
      });
    } else {
      recommendations.push({
        priority: 'low',
        title: 'اچھی پودوں کی صحت (Good Health)',
        action: 'موجودہ طریقہ کار جاری رکھیں'
      });
    }
  }

  if (dataType === 'soil-moisture') {
    const avgMoisture = Array.isArray(values) ? 
      values.reduce((a, b) => a + b, 0) / values.length : values;
    
    if (avgMoisture < 20) {
      recommendations.push({
        priority: 'high',
        title: 'کم مٹی کی نمی (Low Soil Moisture)',
        action: 'فوری آبپاشی کی ضرورت ہے'
      });
    } else if (avgMoisture > 80) {
      recommendations.push({
        priority: 'medium',
        title: 'زیادہ مٹی کی نمی (High Soil Moisture)',
        action: 'نکاسی کا بندوبست کریں'
      });
    }
  }

  if (dataType === 'temperature') {
    const avgTemp = Array.isArray(values) ? 
      values.reduce((a, b) => a + b, 0) / values.length : values;
    
    if (avgTemp > 40) {
      recommendations.push({
        priority: 'high',
        title: 'زیادہ درجہ حرارت (High Temperature)',
        action: 'شام کو پانی دیں اور سایہ کا بندوبست کریں'
      });
    } else if (avgTemp < 10) {
      recommendations.push({
        priority: 'medium',
        title: 'کم درجہ حرارت (Low Temperature)',
        action: 'ٹھنڈ سے بچاؤ کے اقدامات کریں'
      });
    }
  }

  return recommendations;
}

// Generate summary statistics
function generateSummary(dataType, values) {
  if (!Array.isArray(values)) {
    return { value: values, type: 'single' };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const std = Math.sqrt(values.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / values.length);

  return {
    min: min.toFixed(3),
    max: max.toFixed(3),
    average: avg.toFixed(3),
    stdDev: std.toFixed(3),
    count: values.length,
    type: 'array'
  };
}

// Generate fallback analysis
function generateFallbackAnalysis(dataType, values, crop) {
  const avgValue = Array.isArray(values) ? 
    values.reduce((a, b) => a + b, 0) / values.length : values;

  let analysis = '';

  switch (dataType) {
    case 'ndvi':
      if (avgValue < 0.2) {
        analysis = `NDVI تجزیہ: آپ کی فصل کی صحت کمزور ہے (${avgValue.toFixed(2)})۔ فوری اقدامات:\n1. کھاد کی مقدار چیک کریں\n2. آبپاشی کا نظام دیکھیں\n3. کیڑوں اور بیماریوں کی جانچ کریں\n4. مٹی کا ٹیسٹ کروائیں`;
      } else if (avgValue < 0.4) {
        analysis = `NDVI تجزیہ: آپ کی فصل کی صحت درمیانی ہے (${avgValue.toFixed(2)})۔ بہتری کے لیے:\n1. باقاعدہ کھاد ڈالیں\n2. پانی کی مناسب مقدار دیں\n3. ہفتہ وار نگرانی کریں`;
      } else {
        analysis = `NDVI تجزیہ: آپ کی فصل کی صحت بہترین ہے (${avgValue.toFixed(2)})۔ موجودہ طریقہ کار جاری رکھیں اور باقاعدہ نگرانی کریں۔`;
      }
      break;

    case 'soil-moisture':
      if (avgValue < 20) {
        analysis = `مٹی کی نمی: بہت کم (${avgValue.toFixed(1)}%)۔ فوری آبپاشی ضروری ہے۔ صبح یا شام کے وقت پانی دیں۔`;
      } else if (avgValue > 80) {
        analysis = `مٹی کی نمی: بہت زیادہ (${avgValue.toFixed(1)}%)۔ پانی دینا بند کریں اور نکاسی کا بندوبست کریں۔`;
      } else {
        analysis = `مٹی کی نمی: مناسب (${avgValue.toFixed(1)}%)۔ موجودہ آبپاشی کا طریقہ جاری رکھیں۔`;
      }
      break;

    case 'temperature':
      if (avgValue > 40) {
        analysis = `درجہ حرارت: بہت زیادہ (${avgValue.toFixed(1)}°C)۔ شام کو پانی دیں، سایہ کا بندوبست کریں، اور فصل کی حفاظت کریں۔`;
      } else if (avgValue < 10) {
        analysis = `درجہ حرارت: بہت کم (${avgValue.toFixed(1)}°C)۔ ٹھنڈ سے بچاؤ کے اقدامات کریں۔`;
      } else {
        analysis = `درجہ حرارت: مناسب (${avgValue.toFixed(1)}°C)۔ فصل کے لیے موزوں حالات ہیں۔`;
      }
      break;

    default:
      analysis = `ڈیٹا کا تجزیہ: اوسط قیمت ${avgValue.toFixed(2)} ہے۔ مزید تفصیلی تجزیہ کے لیے زرعی ماہر سے رابطہ کریں۔`;
  }

  return analysis;
}

// Get analysis history
export const getAnalysisHistory = async (req, res) => {
  try {
    // In production, fetch from database
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
