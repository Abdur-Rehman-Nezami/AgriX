import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Avatar, Chip, Fab } from '@mui/material';
import { TrendingUp, AccountBalance, LocationOn, CalendarToday, Email, CheckCircle, Grass, Mic } from '@mui/icons-material';
import API from '../utils/api';
import PakistanMap from '../components/PakistanMap';
import WeatherCard from '../components/WeatherCard';
import AICard from '../components/AICard';
import Sidebar from '../components/Sidebar';
import VoiceAssistant from '../components/VoiceAssistant';
import { useLanguage } from '../context/LanguageContext';

export default function FarmerDashboard({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [voiceAssistantOpen, setVoiceAssistantOpen] = useState(false);
  const { t, language } = useLanguage();

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
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Farmer Information Card */}
          <div className="rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #A7F3D0 100%)' }}>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <Avatar 
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      bgcolor: '#FCD34D',
                      fontSize: '3rem',
                      border: '4px solid white',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <h1 className="text-5xl font-bold mb-2 flex items-center gap-3" style={{ color: '#042E25', direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                      {t(`Welcome back, ${user.name}!`, `خوش آمدید، ${user.name}!`)} 🌾
                    </h1>
                    <div className="flex gap-3 mt-3">
                      <Chip 
                        label={user.role.toUpperCase()} 
                        sx={{ 
                          bgcolor: '#FCD34D', 
                          color: '#000', 
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          px: 1
                        }} 
                      />
                      <Chip 
                        icon={<CheckCircle sx={{ color: '#34D399 !important' }} />}
                        label={t('Verified Farmer', 'تصدیق شدہ کسان')}
                        sx={{ 
                          bgcolor: '#D1FAE5', 
                          color: '#042E25', 
                          fontWeight: 'bold',
                          fontSize: '0.9rem'
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Farmer Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-green/20 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <LocationOn sx={{ color: '#F59E0B', fontSize: 28 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>{t('Region', 'علاقہ')}</h3>
                  </div>
                  <p className="text-xl font-bold" style={{ color: '#042E25' }}>{user.region || 'Punjab'}</p>
                  <p className="text-gray-600 text-sm mt-1">{t('Primary farming location', 'بنیادی کاشتکاری کا مقام')}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-green/20 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Email sx={{ color: '#3B82F6', fontSize: 28 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>{t('Email', 'ای میل')}</h3>
                  </div>
                  <p className="text-lg font-medium" style={{ color: '#042E25' }}>{user.email}</p>
                  <p className="text-gray-600 text-sm mt-1">{t('Contact information', 'رابطے کی معلومات')}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-green/20 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarToday sx={{ color: '#10B981', fontSize: 28 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>{t('Member Since', 'رکن بنے')}</h3>
                  </div>
                  <p className="text-xl font-bold" style={{ color: '#042E25' }}>{t('Nov 2024', 'نومبر 2024')}</p>
                  <p className="text-gray-600 text-sm mt-1">{t('Active member', 'فعال رکن')}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center bg-white/40 rounded-xl py-4 border border-green/10">
                  <p className="text-4xl font-bold" style={{ color: '#F59E0B' }}>24</p>
                  <p className="text-gray-700 text-sm mt-1">{t('Price Entries', 'قیمت اندراجات')}</p>
                </div>
                <div className="text-center bg-white/40 rounded-xl py-4 border border-green/10">
                  <p className="text-4xl font-bold" style={{ color: '#3B82F6' }}>12</p>
                  <p className="text-gray-700 text-sm mt-1">{t('Crops Tracked', 'فصلیں ٹریک کی گئیں')}</p>
                </div>
                <div className="text-center bg-white/40 rounded-xl py-4 border border-green/10">
                  <p className="text-4xl font-bold" style={{ color: '#10B981' }}>8</p>
                  <p className="text-gray-700 text-sm mt-1">{t('AI Insights', 'AI بصیرت')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather & AI Insights - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <WeatherCard />
            <AICard />
          </div>

          {/* Quick Actions - Full Width */}
          <Card sx={{ borderRadius: '24px', boxShadow: 3, mb: 8, background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}>
            <CardContent sx={{ p: 4 }}>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                <TrendingUp sx={{ fontSize: 36 }} /> {t('Quick Actions', 'فوری اقدامات')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/farm-tracking" className="block">
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="large" 
                    startIcon={<Grass />}
                    sx={{ 
                      bgcolor: '#10B981', 
                      color: '#fff',
                      '&:hover': { bgcolor: '#059669', transform: 'translateY(-4px)' }, 
                      borderRadius: '16px',
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {t('Farm Tracking', 'فارم ٹریکنگ')}
                  </Button>
                </Link>
                <Link to="/price-tracking" className="block">
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="large" 
                    startIcon={<TrendingUp />}
                    sx={{ 
                      bgcolor: '#3B82F6', 
                      color: '#fff',
                      '&:hover': { bgcolor: '#2563EB', transform: 'translateY(-4px)' },
                      borderRadius: '16px',
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {t('Price Center', 'قیمت مرکز')}
                  </Button>
                </Link>
                <Link to="/remote-sensing" className="block">
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="large"
                    startIcon={<Mic />}
                    sx={{ 
                      bgcolor: '#8B5CF6', 
                      color: '#fff',
                      '&:hover': { bgcolor: '#7C3AED', transform: 'translateY(-4px)' },
                      borderRadius: '16px',
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {t('Remote Sensing', 'ریموٹ سینسنگ')}
                  </Button>
                </Link>
                <Link to="/forum" className="block">
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="large"
                    startIcon={<CheckCircle />}
                    sx={{ 
                      bgcolor: '#F59E0B', 
                      color: '#fff',
                      '&:hover': { bgcolor: '#D97706', transform: 'translateY(-4px)' },
                      borderRadius: '16px',
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {t('Community Forum', 'کمیونٹی فورم')}
                  </Button>
                </Link>
                <Link to="/fbr-registration" className="block">
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="large"
                    startIcon={<AccountBalance />}
                    sx={{ 
                      bgcolor: '#EF4444', 
                      color: '#fff',
                      '&:hover': { bgcolor: '#DC2626', transform: 'translateY(-4px)' },
                      borderRadius: '16px',
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {t('FBR Tax Registration', 'FBR ٹیکس رجسٹریشن')}
                  </Button>
                </Link>
                <Link to="/loans" className="block">
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="large"
                    startIcon={<AccountBalance />}
                    sx={{ 
                      bgcolor: '#06B6D4', 
                      color: '#fff',
                      '&:hover': { bgcolor: '#0891B2', transform: 'translateY(-4px)' },
                      borderRadius: '16px',
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {t('Loan Schemes', 'قرض کی اسکیمیں')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Pakistan Map */}
          <PakistanMap />
        </div>
      </div>

      {/* Voice Assistant FAB */}
      <Fab
        color="primary"
        aria-label="voice assistant"
        onClick={() => setVoiceAssistantOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 120,
          bgcolor: '#3B82F6',
          '&:hover': { 
            bgcolor: '#2563EB',
            transform: 'scale(1.1)'
          },
          width: 70,
          height: 70,
          boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)',
          transition: 'all 0.3s',
          zIndex: 9998
        }}
      >
        <Mic sx={{ fontSize: 32 }} />
      </Fab>

      {/* Voice Assistant Dialog */}
      <VoiceAssistant 
        open={voiceAssistantOpen} 
        onClose={() => setVoiceAssistantOpen(false)}
      />
    </div>
  );
}
