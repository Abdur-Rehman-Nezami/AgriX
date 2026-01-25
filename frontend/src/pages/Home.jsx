import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

const getSlides = (t) => [
  {
    title: t('🌾 Smart Farm Management', '🌾 سمارٹ فارم مینجمنٹ'),
    subtitle: t('Track your crops, soil health, and activities in one place', 'اپنی فصلوں، مٹی کی صحت اور سرگرمیوں کو ایک جگہ ٹریک کریں'),
    description: t('Monitor multiple farm regions with detailed soil analysis, crop stages, and activity logs', 'تفصیلی مٹی کے تجزیہ، فصل کے مراحل اور سرگرمی کے ریکارڈ کے ساتھ متعدد فارم علاقوں کی نگرانی کریں'),
    icon: '🌱',
    gradient: 'from-green-600 to-emerald-500',
    features: [
      t('Soil Health Tracking', 'مٹی کی صحت ٹریکنگ'),
      t('Crop Stage Monitoring', 'فصل کے مرحلے کی نگرانی'),
      t('Activity Logs', 'سرگرمی کے ریکارڈ')
    ]
  },
  {
    title: '📊 Real-Time Price Tracking',
    subtitle: 'Get accurate market data and historical price trends',
    description: 'Compare prices across regions, view historical data, and make informed selling decisions',
    icon: '💰',
    gradient: 'from-blue-600 to-cyan-500',
    features: ['Live Market Prices', 'Historical Trends', 'Price Comparison']
  },
  {
    title: '🤖 AI Voice Assistant',
    subtitle: 'Ask farming questions in Urdu and get instant answers',
    description: 'Speak naturally in Urdu, get AI-powered advice, and hear responses aloud',
    icon: '🎤',
    gradient: 'from-purple-600 to-pink-500',
    features: ['Urdu Voice Recognition', 'AI Farming Advice', 'Text-to-Speech']
  },
  {
    title: '🛰️ Remote Sensing Analysis',
    subtitle: 'Analyze satellite and drone data with AI',
    description: 'Get insights from NDVI, soil moisture, and temperature data with actionable recommendations',
    icon: '📡',
    gradient: 'from-indigo-600 to-blue-500',
    features: ['NDVI Analysis', 'Soil Moisture', 'AI Recommendations']
  },
  {
    title: '💬 Community Forum',
    subtitle: 'Connect with farmers and share knowledge',
    description: 'Ask questions, share solutions, and learn from experienced farmers in your community',
    icon: '👥',
    gradient: 'from-orange-600 to-red-500',
    features: ['Ask Questions', 'Share Solutions', 'Expert Advice']
  },
  {
    title: '🌤️ Weather & AI Insights',
    subtitle: 'Real-time weather with smart farming suggestions',
    description: 'Get weather forecasts for your location and AI-powered crop recommendations',
    icon: '☀️',
    gradient: 'from-yellow-600 to-orange-500',
    features: ['Weather Forecast', 'AI Suggestions', 'GPS Location']
  },
  {
    title: '💳 Government Loan Schemes',
    subtitle: 'Access financial support and subsidies',
    description: 'Browse available loans, subsidies, and government programs for farmers',
    icon: '🏦',
    gradient: 'from-teal-600 to-green-500',
    features: ['Bank Loans', 'Subsidies', 'Government Programs']
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { t, language } = useLanguage();
  
  const slides = getSlides(t);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative min-h-screen overflow-y-auto bg-white">
      {/* Sidebar */}
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />

      {/* Main Content - Shrinks when sidebar expands */}
      <div 
        className="transition-all duration-300"
        style={{ 
          marginLeft: sidebarExpanded ? '280px' : '70px',
          width: sidebarExpanded ? 'calc(100% - 280px)' : 'calc(100% - 70px)'
        }}
      >
        {/* Free Trial Button - Top Left Cut */}
        <div className="absolute top-0 left-0 z-20" style={{ marginLeft: sidebarExpanded ? '280px' : '70px', transition: 'margin-left 0.3s' }}>
          <Link to="/register">
            <div className="relative bg-yellow text-gray-800 font-bold px-8 py-4 text-lg cursor-pointer hover:bg-yellow-400 transition-colors" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}>
              <span className="pr-8">{t('🎁 Free Trial', '🎁 مفت آزمائش')}</span>
            </div>
          </Link>
        </div>

        {/* Slider Container with Bottom Right Cut */}
        <div className="flex items-center justify-center p-8">
          <div className="relative w-full max-w-7xl h-[85vh] bg-white shadow-2xl overflow-hidden"
               style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}>
            
            {/* Slides */}
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
                
                {/* Animated Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                  }} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-between px-16">
                  {/* Left Side - Text Content */}
                  <div className="text-white max-w-2xl z-10">
                    {/* Icon */}
                    <div className="text-8xl mb-6 animate-bounce">
                      {slide.icon}
                    </div>

                    {/* Title */}
                    <h1 className="text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-2xl mb-4 text-white/90 font-semibold">
                      {slide.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-lg mb-6 text-white/80 leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {slide.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30"
                        >
                          ✓ {feature}
                        </div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                      <Link to="/register">
                        <Button 
                          variant="contained" 
                          size="large" 
                          sx={{ 
                            bgcolor: 'white', 
                            color: '#042E25',
                            '&:hover': { 
                              bgcolor: '#F0FDF4',
                              transform: 'scale(1.05)'
                            }, 
                            borderRadius: '16px', 
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s'
                          }}
                        >
                          {t('Get Started Free', 'مفت شروع کریں')}
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button 
                          variant="outlined" 
                          size="large" 
                          sx={{ 
                            borderColor: 'white', 
                            color: 'white',
                            borderWidth: 2,
                            '&:hover': { 
                              borderColor: 'white', 
                              bgcolor: 'rgba(255, 255, 255, 0.2)',
                              borderWidth: 2,
                              transform: 'scale(1.05)'
                            },
                            borderRadius: '16px', 
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            transition: 'all 0.3s'
                          }}
                        >
                          {t('Login', 'لاگ ان')}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Side - Visual Element */}
                  <div className="hidden lg:block">
                    <div className="relative w-96 h-96">
                      {/* Animated Circle */}
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                      <div className="absolute inset-8 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute inset-16 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                      
                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-9xl drop-shadow-2xl">
                          {slide.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                  <svg viewBox="0 0 1440 120" className="w-full h-24 fill-white/10">
                    <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
                  </svg>
                </div>
              </div>
            ))}

            {/* Slider Controls - Bottom Right */}
            <div className="absolute bottom-12 right-12 flex gap-4 z-10">
              <IconButton 
                onClick={prevSlide}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.9)', 
                  '&:hover': { bgcolor: '#34D399', color: '#fff' },
                  width: 56,
                  height: 56
                }}
              >
                <ArrowBackIos sx={{ ml: 1 }} />
              </IconButton>
              <IconButton 
                onClick={nextSlide}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.9)', 
                  '&:hover': { bgcolor: '#34D399', color: '#fff' },
                  width: 56,
                  height: 56
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 left-16 flex gap-3 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-12 bg-green' 
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Subscription Plans Section */}
        <div className="py-20 px-8" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DBEAFE 100%)' }}>
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4" style={{ color: '#042E25' }}>
                {t('Choose Your Plan', 'اپنا پلان منتخب کریں')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('Start free, upgrade when you need more', 'مفت شروع کریں، ضرورت پڑنے پر اپ گریڈ کریں')}
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🌱</div>
                  <h3 className="text-3xl font-bold mb-2" style={{ color: '#042E25' }}>Free</h3>
                  <div className="text-5xl font-bold mb-2" style={{ color: '#10B981' }}>
                    ₨0
                    <span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-600">Perfect for getting started</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">Basic Price Tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">Weather Forecasts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">Community Forum Access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">1 Farm Region</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-300 text-xl">✗</span>
                    <span className="text-gray-400">AI Voice Assistant</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-300 text-xl">✗</span>
                    <span className="text-gray-400">Remote Sensing</span>
                  </li>
                </ul>

                <Link to="/register">
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#10B981',
                      color: '#10B981',
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: '#059669',
                        bgcolor: '#F0FDF4',
                        borderWidth: 2
                      },
                      borderRadius: '16px',
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Start Free
                  </Button>
                </Link>
              </div>

              {/* Pro Plan - Featured */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 border-4 border-yellow-400 relative transform scale-105">
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    ⭐ MOST POPULAR
                  </div>
                </div>

                <div className="text-center mb-6 text-white">
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-3xl font-bold mb-2">Pro</h3>
                  <div className="text-5xl font-bold mb-2">
                    ₨999
                    <span className="text-lg opacity-80">/month</span>
                  </div>
                  <p className="opacity-90">For serious farmers</p>
                </div>

                <ul className="space-y-4 mb-8 text-white">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-xl">✓</span>
                    <span className="font-semibold">Everything in Free</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-xl">✓</span>
                    <span className="font-semibold">AI Voice Assistant (Unlimited)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-xl">✓</span>
                    <span className="font-semibold">Remote Sensing Analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-xl">✓</span>
                    <span className="font-semibold">Up to 10 Farm Regions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-xl">✓</span>
                    <span className="font-semibold">Advanced Analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-300 text-xl">✓</span>
                    <span className="font-semibold">Priority Support</span>
                  </li>
                </ul>

                <Link to="/register">
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: '#10B981',
                      '&:hover': {
                        bgcolor: '#FEF3C7',
                        transform: 'scale(1.05)'
                      },
                      borderRadius: '16px',
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}
                  >
                    Get Pro Now
                  </Button>
                </Link>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🏢</div>
                  <h3 className="text-3xl font-bold mb-2" style={{ color: '#042E25' }}>Enterprise</h3>
                  <div className="text-5xl font-bold mb-2" style={{ color: '#3B82F6' }}>
                    Custom
                  </div>
                  <p className="text-gray-600">For large organizations</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span className="text-gray-700 font-semibold">Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span className="text-gray-700">Unlimited Farm Regions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span className="text-gray-700">Custom AI Training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span className="text-gray-700">API Access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span className="text-gray-700">Dedicated Support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl">✓</span>
                    <span className="text-gray-700">Custom Integrations</span>
                  </li>
                </ul>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#3B82F6',
                    color: '#3B82F6',
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#2563EB',
                      bgcolor: '#EFF6FF',
                      borderWidth: 2
                    },
                    borderRadius: '16px',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Contact Sales
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-6">Trusted by farmers across Pakistan</p>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="text-4xl">🌾</div>
                <div className="text-gray-700 font-semibold">10,000+ Farmers</div>
                <div className="text-4xl">📊</div>
                <div className="text-gray-700 font-semibold">1M+ Price Entries</div>
                <div className="text-4xl">🤖</div>
                <div className="text-gray-700 font-semibold">AI-Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
