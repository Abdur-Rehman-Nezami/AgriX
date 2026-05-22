import React, { useState } from 'react';
import { Card, CardContent, Button, Chip } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

export default function LoanSchemes() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { t, language } = useLanguage();

  const schemes = [
    { 
      name: t('Kisan Package', 'کسان پیکیج'), 
      org: t('National Bank', 'نیشنل بینک'), 
      type: t('Loan', 'قرض'), 
      rate: '5%', 
      eligibility: t('Small farmers', 'چھوٹے کسان'), 
      link: 'https://www.nbp.com.pk' 
    },
    { 
      name: t('Agriculture Subsidy', 'زرعی سبسڈی'), 
      org: t('Government of Pakistan', 'حکومت پاکستان'), 
      type: t('Subsidy', 'سبسڈی'), 
      rate: 'N/A', 
      eligibility: t('All farmers', 'تمام کسان'), 
      link: 'https://www.pakistan.gov.pk' 
    },
    { 
      name: t('Zarai Taraqiati Bank', 'زرعی ترقیاتی بینک'), 
      org: 'ZTBL', 
      type: t('Loan', 'قرض'), 
      rate: '6%', 
      eligibility: t('Medium farmers', 'درمیانے کسان'), 
      link: 'https://www.ztbl.com.pk' 
    },
    { 
      name: t('PM Agriculture Scheme', 'وزیر اعظم زرعی اسکیم'), 
      org: t('Federal Government', 'وفاقی حکومت'), 
      type: t('Grant', 'گرانٹ'), 
      rate: 'N/A', 
      eligibility: t('Registered farmers', 'رجسٹرڈ کسان'), 
      link: 'https://www.pakistan.gov.pk' 
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      
      <div 
        className="transition-all duration-300 min-h-screen p-8"
        style={{ 
          marginLeft: sidebarExpanded ? '280px' : '70px',
          width: sidebarExpanded ? 'calc(100% - 280px)' : 'calc(100% - 70px)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h1 className="text-5xl font-bold mb-4 text-blue" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
              💰 {t('Loan & Scheme Center', 'قرض اور اسکیم سینٹر')}
            </h1>
            <p className="text-gray-600 text-lg" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
              {t('Explore government and bank programs for farmers', 'کسانوں کے لیے حکومتی اور بینک پروگرام دریافت کریں')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme, i) => (
              <Card key={i} sx={{ borderRadius: '24px', boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                <CardContent>
                  <div className="flex justify-between items-start mb-4" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                    <h3 className="text-2xl font-bold text-green">{scheme.name}</h3>
                    <Chip label={scheme.type} color={scheme.type === t('Loan', 'قرض') ? 'primary' : 'success'} />
                  </div>
                  <p className="text-gray-700 mb-2" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                    <strong>{t('Organization:', 'ادارہ:')}</strong> {scheme.org}
                  </p>
                  <p className="text-gray-700 mb-2" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                    <strong>{t('Interest Rate:', 'سود کی شرح:')}</strong> {scheme.rate}
                  </p>
                  <p className="text-gray-700 mb-4" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                    <strong>{t('Eligibility:', 'اہلیت:')}</strong> {scheme.eligibility}
                  </p>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    href={scheme.link} 
                    target="_blank" 
                    sx={{ bgcolor: '#60A5FA', '&:hover': { bgcolor: '#3B82F6' }, borderRadius: '12px', py: 1.5, fontWeight: 'bold' }}
                  >
                    {t('Learn More', 'مزید جانیں')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
