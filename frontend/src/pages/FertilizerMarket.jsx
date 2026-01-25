import React, { useState } from 'react';
import { Card, CardContent, Button, Chip, Tabs, Tab, Box, Grid, Alert } from '@mui/material';
import { LocalShipping, TrendingDown, Newspaper, CardGiftcard, Store, Info } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

export default function FertilizerMarket({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  // Mock fertilizer prices data
  const fertilizerPrices = [
    {
      name: t('Urea', 'یوریا'),
      price: 'PKR 2,850',
      unit: t('per 50kg bag', 'فی 50 کلو بیگ'),
      change: '-5%',
      trend: 'down',
      availability: t('In Stock', 'دستیاب'),
      subsidized: true
    },
    {
      name: t('DAP (Di-Ammonium Phosphate)', 'ڈی اے پی'),
      price: 'PKR 9,500',
      unit: t('per 50kg bag', 'فی 50 کلو بیگ'),
      change: '+2%',
      trend: 'up',
      availability: t('In Stock', 'دستیاب'),
      subsidized: true
    },
    {
      name: t('NPK (Nitrogen Phosphorus Potassium)', 'این پی کے'),
      price: 'PKR 7,200',
      unit: t('per 50kg bag', 'فی 50 کلو بیگ'),
      change: '0%',
      trend: 'stable',
      availability: t('In Stock', 'دستیاب'),
      subsidized: false
    },
    {
      name: t('Potash (SOP)', 'پوٹاش'),
      price: 'PKR 6,800',
      unit: t('per 50kg bag', 'فی 50 کلو بیگ'),
      change: '-3%',
      trend: 'down',
      availability: t('Limited Stock', 'محدود اسٹاک'),
      subsidized: false
    },
    {
      name: t('Calcium Ammonium Nitrate (CAN)', 'کیلشیم امونیم نائٹریٹ'),
      price: 'PKR 4,500',
      unit: t('per 50kg bag', 'فی 50 کلو بیگ'),
      change: '+1%',
      trend: 'up',
      availability: t('In Stock', 'دستیاب'),
      subsidized: true
    },
    {
      name: t('Zinc Sulphate', 'زنک سلفیٹ'),
      price: 'PKR 3,200',
      unit: t('per 25kg bag', 'فی 25 کلو بیگ'),
      change: '0%',
      trend: 'stable',
      availability: t('In Stock', 'دستیاب'),
      subsidized: false
    }
  ];

  // Subsidy schemes
  const subsidySchemes = [
    {
      title: t('Prime Minister Agriculture Package', 'وزیر اعظم زرعی پیکیج'),
      discount: t('30% subsidy on Urea', 'یوریا پر 30% سبسڈی'),
      eligibility: t('Small farmers (up to 12.5 acres)', 'چھوٹے کسان (12.5 ایکڑ تک)'),
      validity: t('Valid until June 2025', 'جون 2025 تک درست'),
      howToApply: t('Apply through nearest agriculture office', 'قریبی زرعی دفتر کے ذریعے درخواست دیں'),
      icon: '🌾',
      color: '#10B981'
    },
    {
      title: t('DAP Subsidy Scheme', 'ڈی اے پی سبسڈی اسکیم'),
      discount: t('25% subsidy on DAP', 'ڈی اے پی پر 25% سبسڈی'),
      eligibility: t('All registered farmers', 'تمام رجسٹرڈ کسان'),
      validity: t('Valid until December 2024', 'دسمبر 2024 تک درست'),
      howToApply: t('Register online at www.agri.gov.pk', 'www.agri.gov.pk پر آن لائن رجسٹر کریں'),
      icon: '💰',
      color: '#3B82F6'
    },
    {
      title: t('Balochistan Fertilizer Support', 'بلوچستان کھاد سپورٹ'),
      discount: t('40% subsidy on all fertilizers', 'تمام کھادوں پر 40% سبسڈی'),
      eligibility: t('Farmers in Balochistan only', 'صرف بلوچستان کے کسان'),
      validity: t('Valid until March 2025', 'مارچ 2025 تک درست'),
      howToApply: t('Contact district agriculture officer', 'ضلعی زرعی افسر سے رابطہ کریں'),
      icon: '🎁',
      color: '#F59E0B'
    },
    {
      title: t('Organic Fertilizer Promotion', 'نامیاتی کھاد فروغ'),
      discount: t('50% subsidy on organic fertilizers', 'نامیاتی کھادوں پر 50% سبسڈی'),
      eligibility: t('Farmers adopting organic farming', 'نامیاتی کاشتکاری اپنانے والے کسان'),
      validity: t('Valid until August 2025', 'اگست 2025 تک درست'),
      howToApply: t('Apply through provincial agriculture department', 'صوبائی زرعی محکمے کے ذریعے درخواست دیں'),
      icon: '🌱',
      color: '#10B981'
    }
  ];

  // Latest news
  const news = [
    {
      title: t('Government Announces New Fertilizer Subsidy for Rabi Season', 'حکومت نے ربیع کے موسم کے لیے نئی کھاد سبسڈی کا اعلان کیا'),
      date: t('November 3, 2024', '3 نومبر 2024'),
      summary: t('Federal government has announced a PKR 10 billion subsidy package for fertilizers during the Rabi season to support wheat farmers.', 
                 'وفاقی حکومت نے گندم کے کسانوں کی مدد کے لیے ربیع کے موسم میں کھادوں کے لیے 10 ارب روپے کا سبسڈی پیکیج کا اعلان کیا ہے۔'),
      category: t('Subsidy', 'سبسڈی'),
      color: '#10B981'
    },
    {
      title: t('Urea Prices Drop by 5% This Week', 'اس ہفتے یوریا کی قیمتوں میں 5% کمی'),
      date: t('November 1, 2024', '1 نومبر 2024'),
      summary: t('Due to increased local production and government intervention, urea prices have decreased by PKR 150 per bag.', 
                 'مقامی پیداوار میں اضافے اور حکومتی مداخلت کی وجہ سے یوریا کی قیمتوں میں فی بیگ 150 روپے کی کمی واقع ہوئی ہے۔'),
      category: t('Price Update', 'قیمت اپ ڈیٹ'),
      color: '#3B82F6'
    },
    {
      title: t('New DAP Manufacturing Plant Opens in Punjab', 'پنجاب میں نیا ڈی اے پی مینوفیکچرنگ پلانٹ کھل گیا'),
      date: t('October 28, 2024', '28 اکتوبر 2024'),
      summary: t('A new state-of-the-art DAP manufacturing facility has been inaugurated in Multan, expected to produce 500,000 tons annually.', 
                 'ملتان میں ایک نیا جدید ڈی اے پی مینوفیکچرنگ پلانٹ کا افتتاح کیا گیا ہے، جس سے سالانہ 5 لاکھ ٹن پیداوار متوقع ہے۔'),
      category: t('Industry News', 'صنعتی خبریں'),
      color: '#F59E0B'
    },
    {
      title: t('Warning: Beware of Fake Fertilizers in Market', 'انتباہ: مارکیٹ میں جعلی کھادوں سے ہوشیار رہیں'),
      date: t('October 25, 2024', '25 اکتوبر 2024'),
      summary: t('Agriculture department warns farmers about counterfeit fertilizers being sold. Always buy from authorized dealers and check for quality marks.', 
                 'زرعی محکمہ کسانوں کو جعلی کھادوں کی فروخت کے بارے میں خبردار کرتا ہے۔ ہمیشہ مجاز ڈیلرز سے خریدیں اور کوالٹی مارکس چیک کریں۔'),
      category: t('Alert', 'الرٹ'),
      color: '#EF4444'
    },
    {
      title: t('Zinc Deficiency in Soil: Free Testing Campaign Launched', 'مٹی میں زنک کی کمی: مفت ٹیسٹنگ مہم شروع'),
      date: t('October 20, 2024', '20 اکتوبر 2024'),
      summary: t('Provincial agriculture department has launched a free soil testing campaign to detect zinc deficiency. Farmers can get their soil tested at district offices.', 
                 'صوبائی زرعی محکمے نے زنک کی کمی کا پتہ لگانے کے لیے مفت مٹی ٹیسٹنگ مہم شروع کی ہے۔ کسان ضلعی دفاتر میں اپنی مٹی کا ٹیسٹ کروا سکتے ہیں۔'),
      category: t('Service', 'خدمت'),
      color: '#8B5CF6'
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'down') return '↓';
    if (trend === 'up') return '↑';
    return '→';
  };

  const getTrendColor = (trend) => {
    if (trend === 'down') return '#10B981';
    if (trend === 'up') return '#EF4444';
    return '#6B7280';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      
      <div 
        className="transition-all duration-300 min-h-screen p-8"
        style={{ 
          marginLeft: sidebarExpanded ? '280px' : '70px',
          width: sidebarExpanded ? 'calc(100% - 280px)' : 'calc(100% - 70px)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden" 
               style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2 text-white" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                🌿 {t('Fertilizer Market', 'کھاد مارکیٹ')}
              </h1>
              <p className="text-white/90 text-lg" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                {t('Latest prices, subsidies, and news for farmers', 'کسانوں کے لیے تازہ ترین قیمتیں، سبسڈیز اور خبریں')}
              </p>
            </div>
          </div>

          {/* Important Alert */}
          <Alert severity="info" icon={<Info />} sx={{ mb: 4, borderRadius: '16px' }}>
            <p style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
              <strong>{t('Tip:', 'ٹپ:')}</strong> {t('Always buy fertilizers from authorized dealers and check for quality certification marks.', 
                     'ہمیشہ مجاز ڈیلرز سے کھاد خریدیں اور کوالٹی سرٹیفیکیشن مارکس چیک کریں۔')}
            </p>
          </Alert>

          {/* Tabs */}
          <Card sx={{ borderRadius: '24px', boxShadow: 3, mb: 4 }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab 
                label={t('Current Prices', 'موجودہ قیمتیں')} 
                icon={<Store />} 
                iconPosition="start"
                sx={{ fontSize: '1rem', fontWeight: 'bold', py: 2 }}
              />
              <Tab 
                label={t('Subsidy Schemes', 'سبسڈی اسکیمیں')} 
                icon={<CardGiftcard />} 
                iconPosition="start"
                sx={{ fontSize: '1rem', fontWeight: 'bold', py: 2 }}
              />
              <Tab 
                label={t('Latest News', 'تازہ ترین خبریں')} 
                icon={<Newspaper />} 
                iconPosition="start"
                sx={{ fontSize: '1rem', fontWeight: 'bold', py: 2 }}
              />
            </Tabs>
          </Card>

          {/* Tab 1: Current Prices */}
          {activeTab === 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                💰 {t('Current Fertilizer Prices', 'موجودہ کھاد کی قیمتیں')}
              </h2>
              <Grid container spacing={4}>
                {fertilizerPrices.map((fertilizer, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card sx={{ 
                      borderRadius: '24px', 
                      boxShadow: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-8px)' },
                      border: fertilizer.subsidized ? '2px solid #10B981' : 'none'
                    }}>
                      <CardContent sx={{ p: 4 }}>
                        {fertilizer.subsidized && (
                          <Chip 
                            label={t('Subsidized', 'سبسڈی شدہ')}
                            size="small"
                            sx={{ 
                              bgcolor: '#D1FAE5', 
                              color: '#059669', 
                              fontWeight: 'bold',
                              mb: 2
                            }}
                          />
                        )}
                        <h3 className="text-2xl font-bold mb-3 text-gray-900" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                          {fertilizer.name}
                        </h3>
                        <div className="flex items-baseline gap-2 mb-2">
                          <p className="text-4xl font-bold text-green-600">{fertilizer.price}</p>
                          <span 
                            className="text-lg font-bold"
                            style={{ color: getTrendColor(fertilizer.trend) }}
                          >
                            {getTrendIcon(fertilizer.trend)} {fertilizer.change}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{fertilizer.unit}</p>
                        <Chip 
                          label={fertilizer.availability}
                          size="small"
                          sx={{ 
                            bgcolor: fertilizer.availability.includes('Limited') || fertilizer.availability.includes('محدود') ? '#FEF3C7' : '#D1FAE5',
                            color: fertilizer.availability.includes('Limited') || fertilizer.availability.includes('محدود') ? '#92400E' : '#059669',
                            fontWeight: 'bold'
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Price Update Info */}
              <Card sx={{ borderRadius: '24px', boxShadow: 3, mt: 4, bgcolor: '#EFF6FF' }}>
                <CardContent sx={{ p: 4 }}>
                  <p className="text-gray-700" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                    <strong>{t('Last Updated:', 'آخری اپ ڈیٹ:')}</strong> {t('November 4, 2024, 9:00 AM', '4 نومبر 2024، صبح 9 بجے')}
                  </p>
                  <p className="text-gray-600 text-sm mt-2" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                    {t('Prices may vary by region and dealer. Contact your local agriculture office for exact rates.', 
                       'قیمتیں علاقے اور ڈیلر کے لحاظ سے مختلف ہو سکتی ہیں۔ درست قیمتوں کے لیے اپنے مقامی زرعی دفتر سے رابطہ کریں۔')}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tab 2: Subsidy Schemes */}
          {activeTab === 1 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                🎁 {t('Available Subsidy Schemes', 'دستیاب سبسڈی اسکیمیں')}
              </h2>
              <Grid container spacing={4}>
                {subsidySchemes.map((scheme, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card sx={{ 
                      borderRadius: '24px', 
                      boxShadow: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-8px)' },
                      borderLeft: `6px solid ${scheme.color}`
                    }}>
                      <CardContent sx={{ p: 4 }}>
                        <div className="flex items-start gap-3 mb-4">
                          <div className="text-5xl">{scheme.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                              {scheme.title}
                            </h3>
                            <Chip 
                              label={scheme.discount}
                              sx={{ 
                                bgcolor: `${scheme.color}20`,
                                color: scheme.color,
                                fontWeight: 'bold',
                                fontSize: '0.9rem'
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-sm text-gray-600 mb-1" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                              <strong>{t('Eligibility:', 'اہلیت:')}</strong>
                            </p>
                            <p className="text-gray-800" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                              {scheme.eligibility}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-sm text-gray-600 mb-1" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                              <strong>{t('Validity:', 'درستگی:')}</strong>
                            </p>
                            <p className="text-gray-800" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                              {scheme.validity}
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 rounded-xl p-3">
                            <p className="text-sm text-gray-600 mb-1" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                              <strong>{t('How to Apply:', 'کیسے درخواست دیں:')}</strong>
                            </p>
                            <p className="text-gray-800" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                              {scheme.howToApply}
                            </p>
                          </div>
                        </div>

                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          sx={{
                            bgcolor: scheme.color,
                            '&:hover': { bgcolor: scheme.color, filter: 'brightness(0.9)' },
                            borderRadius: '12px',
                            mt: 3,
                            py: 1.5,
                            fontWeight: 'bold'
                          }}
                        >
                          {t('Apply Now', 'ابھی درخواست دیں')}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}

          {/* Tab 3: Latest News */}
          {activeTab === 2 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                📰 {t('Latest Fertilizer News', 'تازہ ترین کھاد کی خبریں')}
              </h2>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <Card key={index} sx={{ 
                    borderRadius: '24px', 
                    boxShadow: 3,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateX(-8px)' }
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">📰</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Chip 
                              label={item.category}
                              size="small"
                              sx={{ 
                                bgcolor: `${item.color}20`,
                                color: item.color,
                                fontWeight: 'bold'
                              }}
                            />
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-gray-900" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                            {item.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                            {item.summary}
                          </p>
                          <Button
                            variant="text"
                            sx={{ 
                              mt: 2, 
                              color: item.color,
                              fontWeight: 'bold'
                            }}
                          >
                            {t('Read More →', 'مزید پڑھیں ←')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <Card sx={{ borderRadius: '24px', boxShadow: 3, mt: 6, bgcolor: '#FEF3C7' }}>
            <CardContent sx={{ p: 4 }}>
              <h3 className="text-2xl font-bold mb-4 text-gray-900" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                📞 {t('Need Help?', 'مدد چاہیے؟')}
              </h3>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <div className="text-center">
                    <p className="text-gray-700 font-semibold mb-1">{t('Fertilizer Helpline', 'کھاد ہیلپ لائن')}</p>
                    <p className="text-xl font-bold text-green-600">051-9252476</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className="text-center">
                    <p className="text-gray-700 font-semibold mb-1">{t('Subsidy Queries', 'سبسڈی سوالات')}</p>
                    <p className="text-xl font-bold text-green-600">051-9252477</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className="text-center">
                    <p className="text-gray-700 font-semibold mb-1">{t('Complaint Cell', 'شکایت سیل')}</p>
                    <p className="text-xl font-bold text-green-600">051-9252478</p>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
