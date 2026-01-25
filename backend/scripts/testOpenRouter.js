import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const testOpenRouterAPI = async () => {
  console.log('🔍 Testing OpenRouter API...\n');
  console.log('API Key:', process.env.OPENROUTER_API_KEY ? 
    `${process.env.OPENROUTER_API_KEY.substring(0, 20)}...` : 
    '❌ NOT FOUND');
  console.log('');

  try {
    console.log('📡 Sending request to OpenRouter...');
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4',
        messages: [
          {
            role: 'user',
            content: 'Say "Hello, your API is working!" in Urdu.'
          }
        ],
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5001',
          'X-Title': 'AgroSmart API Test'
        },
        timeout: 15000
      }
    );

    console.log('✅ SUCCESS! API is working!\n');
    console.log('Response:');
    console.log('─────────────────────────────────────');
    console.log(response.data.choices[0].message.content);
    console.log('─────────────────────────────────────\n');
    
    console.log('Model used:', response.data.model);
    console.log('Tokens used:', response.data.usage?.total_tokens || 'N/A');
    
  } catch (error) {
    console.error('❌ ERROR! API test failed\n');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
      
      if (error.response.status === 401) {
        console.error('\n💡 This means your API key is invalid or expired.');
      } else if (error.response.status === 402) {
        console.error('\n💡 This means you have insufficient credits.');
      } else if (error.response.status === 429) {
        console.error('\n💡 This means you hit the rate limit.');
      }
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Check your internet connection');
    } else {
      console.error('Error:', error.message);
    }
  }
};

// Also test with free model
const testFreeModel = async () => {
  console.log('\n\n🔍 Testing with FREE model (Llama 3.1)...\n');
  
  try {
    console.log('📡 Sending request to OpenRouter...');
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'user',
            content: 'Say "Hello from free model!" in Urdu.'
          }
        ],
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5001',
          'X-Title': 'AgroSmart API Test'
        },
        timeout: 15000
      }
    );

    console.log('✅ SUCCESS! Free model is working!\n');
    console.log('Response:');
    console.log('─────────────────────────────────────');
    console.log(response.data.choices[0].message.content);
    console.log('─────────────────────────────────────\n');
    
    console.log('Model used:', response.data.model);
    
  } catch (error) {
    console.error('❌ ERROR! Free model test failed\n');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

// Run tests
(async () => {
  await testOpenRouterAPI();
  await testFreeModel();
  process.exit(0);
})();
