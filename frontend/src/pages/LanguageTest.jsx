import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button, Card, CardContent } from '@mui/material';

export default function LanguageTest() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <Card sx={{ borderRadius: '24px', boxShadow: 3, mb: 4 }}>
          <CardContent sx={{ p: 6 }}>
            <h1 className="text-4xl font-bold mb-4 text-center">
              {t('Language Toggle Test', 'زبان ٹوگل ٹیسٹ')}
            </h1>
            
            <div className="text-center mb-6">
              <p className="text-2xl mb-2">
                {t('Current Language:', 'موجودہ زبان:')} <strong>{language}</strong>
              </p>
              <p className="text-lg text-gray-600">
                {t('Click the button below or the floating button to toggle', 'ٹوگل کرنے کے لیے نیچے دیا گیا بٹن یا فلوٹنگ بٹن پر کلک کریں')}
              </p>
            </div>

            <div className="text-center mb-6">
              <Button
                variant="contained"
                size="large"
                onClick={toggleLanguage}
                sx={{
                  bgcolor: language === 'urdu' ? '#10B981' : '#3B82F6',
                  '&:hover': {
                    bgcolor: language === 'urdu' ? '#059669' : '#2563EB'
                  },
                  borderRadius: '16px',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}
              >
                {t('Toggle Language', 'زبان تبدیل کریں')}
              </Button>
            </div>

            <div className="space-y-4">
              <Card sx={{ bgcolor: '#F0FDF4', p: 3, borderRadius: '16px' }}>
                <h3 className="text-xl font-bold mb-2">
                  {t('Welcome Message', 'خوش آمدید پیغام')}
                </h3>
                <p className="text-lg" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                  {t(
                    'Welcome to AgroSmart! This is a test page to verify language switching.',
                    'AgroSmart میں خوش آمدید! یہ زبان کی تبدیلی کی تصدیق کے لیے ایک ٹیسٹ صفحہ ہے۔'
                  )}
                </p>
              </Card>

              <Card sx={{ bgcolor: '#EFF6FF', p: 3, borderRadius: '16px' }}>
                <h3 className="text-xl font-bold mb-2">
                  {t('Features', 'خصوصیات')}
                </h3>
                <ul className="list-disc list-inside space-y-2" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                  <li>{t('Price Tracking', 'قیمت ٹریکنگ')}</li>
                  <li>{t('Weather Forecast', 'موسم کی پیشن گوئی')}</li>
                  <li>{t('AI Assistant', 'AI اسسٹنٹ')}</li>
                  <li>{t('Community Forum', 'کمیونٹی فورم')}</li>
                  <li>{t('Remote Sensing', 'ریموٹ سینسنگ')}</li>
                </ul>
              </Card>

              <Card sx={{ bgcolor: '#FEF3C7', p: 3, borderRadius: '16px' }}>
                <h3 className="text-xl font-bold mb-2">
                  {t('Instructions', 'ہدایات')}
                </h3>
                <p style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                  {t(
                    '1. Click the toggle button above or the floating button in the bottom-right corner',
                    '۱۔ اوپر دیے گئے ٹوگل بٹن یا نیچے دائیں کونے میں فلوٹنگ بٹن پر کلک کریں'
                  )}
                </p>
                <p style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                  {t(
                    '2. Watch all text on this page change language',
                    '۲۔ اس صفحے پر تمام متن کو زبان تبدیل کرتے ہوئے دیکھیں'
                  )}
                </p>
                <p style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                  {t(
                    '3. The language preference is saved in your browser',
                    '۳۔ زبان کی ترجیح آپ کے براؤزر میں محفوظ ہے'
                  )}
                </p>
              </Card>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {t(
                  'Open browser console (F12) to see debug logs',
                  'ڈیبگ لاگز دیکھنے کے لیے براؤزر کنسول کھولیں (F12)'
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
