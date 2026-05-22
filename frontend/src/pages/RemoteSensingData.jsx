import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, Grid, Chip, IconButton } from '@mui/material';
import { Add, Delete, Satellite, TrendingUp, Opacity, Thermostat } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

export default function RemoteSensingData({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { t } = useLanguage();
  const [polygons, setPolygons] = useState([]);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [newPolygon, setNewPolygon] = useState({
    name: '',
    coordinates: []
  });

  // Mock remote sensing data
  const mockSensingData = {
    ndvi: {
      value: 0.72,
      status: 'Healthy',
      trend: 'up',
      color: '#10B981',
      icon: <Satellite />
    },
    soilMoisture: {
      value: 45,
      status: 'Optimal',
      trend: 'stable',
      color: '#3B82F6',
      icon: <Opacity />
    },
    temperature: {
      value: 28,
      status: 'Normal',
      trend: 'up',
      color: '#F59E0B',
      icon: <Thermostat />
    },
    cropHealth: {
      value: 85,
      status: 'Good',
      trend: 'up',
      color: '#10B981',
      icon: <TrendingUp />
    }
  };

  const handleAddPolygon = () => {
    if (newPolygon.name) {
      const polygon = {
        id: Date.now(),
        name: newPolygon.name,
        coordinates: [
          [73.0479, 33.6844], // Islamabad example
          [73.0579, 33.6844],
          [73.0579, 33.6744],
          [73.0479, 33.6744],
          [73.0479, 33.6844]
        ],
        area: '2.5 hectares',
        createdAt: new Date().toISOString()
      };
      setPolygons([...polygons, polygon]);
      setNewPolygon({ name: '', coordinates: [] });
      setSelectedPolygon(polygon);
    }
  };

  const handleDeletePolygon = (id) => {
    setPolygons(polygons.filter(p => p.id !== id));
    if (selectedPolygon?.id === id) {
      setSelectedPolygon(null);
    }
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
               style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2 text-white">
                🛰️ {t('Remote Sensing Data', 'ریموٹ سینسنگ ڈیٹا')}
              </h1>
              <p className="text-white/90 text-lg">
                {t('Monitor your farm regions with satellite data', 'سیٹلائٹ ڈیٹا کے ساتھ اپنے فارم علاقوں کی نگرانی کریں')}
              </p>
            </div>
          </div>

          {/* Create Polygon Section */}
          <Card sx={{ borderRadius: '24px', boxShadow: 3, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Add /> {t('Create Farm Region', 'فارم علاقہ بنائیں')}
              </h2>
              
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label={t('Region Name', 'علاقے کا نام')}
                    value={newPolygon.name}
                    onChange={(e) => setNewPolygon({ ...newPolygon, name: e.target.value })}
                    placeholder={t('e.g., North Field, Main Farm', 'مثال: شمالی کھیت، مرکزی فارم')}
                    sx={{ 
                      bgcolor: 'white', 
                      borderRadius: '12px', 
                      '& .MuiOutlinedInput-root': { borderRadius: '12px' } 
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<Add />}
                    onClick={handleAddPolygon}
                    disabled={!newPolygon.name}
                    sx={{
                      bgcolor: '#10B981',
                      '&:hover': { bgcolor: '#059669' },
                      borderRadius: '12px',
                      py: 2,
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {t('Add Region', 'علاقہ شامل کریں')}
                  </Button>
                </Grid>
              </Grid>

              {/* Polygon List */}
              {polygons.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3 text-gray-700">
                    {t('Your Farm Regions', 'آپ کے فارم علاقے')} ({polygons.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {polygons.map((polygon) => (
                      <div
                        key={polygon.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedPolygon?.id === polygon.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedPolygon(polygon)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{polygon.name}</h4>
                            <p className="text-sm text-gray-600">{polygon.area}</p>
                          </div>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePolygon(polygon.id);
                            }}
                            sx={{ color: '#EF4444' }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </div>
                        <Chip
                          label={selectedPolygon?.id === polygon.id ? t('Selected', 'منتخب') : t('Click to view', 'دیکھنے کے لیے کلک کریں')}
                          size="small"
                          sx={{
                            bgcolor: selectedPolygon?.id === polygon.id ? '#3B82F6' : '#E5E7EB',
                            color: selectedPolygon?.id === polygon.id ? 'white' : '#6B7280',
                            fontWeight: 'bold'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Map Section */}
          {selectedPolygon && (
            <Card sx={{ borderRadius: '24px', boxShadow: 3, mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  🗺️ {t('Map View', 'نقشہ منظر')} - {selectedPolygon.name}
                </h2>
                
                {/* Mock Map */}
                <div 
                  className="w-full rounded-2xl overflow-hidden relative"
                  style={{ 
                    height: '400px',
                    background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                    border: '2px solid #3B82F6'
                  }}
                >
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        {t('Interactive Map', 'انٹرایکٹو نقشہ')}
                      </h3>
                      <p className="text-gray-600">
                        {t('Showing region:', 'علاقہ دکھا رہا ہے:')} {selectedPolygon.name}
                      </p>
                      <div className="mt-4 bg-white/80 rounded-xl p-4 inline-block">
                        <p className="text-sm text-gray-700">
                          <strong>{t('Coordinates:', 'نقاط:')}</strong>
                        </p>
                        <p className="text-xs text-gray-600 font-mono mt-1">
                          {selectedPolygon.coordinates[0].join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Polygon Overlay */}
                  <div 
                    className="absolute"
                    style={{
                      top: '25%',
                      left: '25%',
                      width: '50%',
                      height: '50%',
                      border: '3px dashed #10B981',
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      borderRadius: '8px'
                    }}
                  >
                    <div className="absolute -top-8 left-0 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      {selectedPolygon.name}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-3 text-center">
                  {t('Map integration with Leaflet or Google Maps can be added here', 'یہاں Leaflet یا Google Maps کے ساتھ نقشہ انضمام شامل کیا جا سکتا ہے')}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Remote Sensing Insights */}
          {selectedPolygon && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                📊 {t('Remote Sensing Insights', 'ریموٹ سینسنگ بصیرت')}
              </h2>

              <Grid container spacing={4}>
                {/* NDVI Card */}
                <Grid item xs={12} md={6} lg={3}>
                  <Card sx={{ 
                    borderRadius: '24px', 
                    boxShadow: 3,
                    background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                    border: '2px solid #10B981'
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-4xl">{mockSensingData.ndvi.icon}</div>
                        <Chip
                          label={mockSensingData.ndvi.trend === 'up' ? '↑' : '→'}
                          size="small"
                          sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 'bold' }}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-700 mb-2">
                        {t('NDVI Index', 'NDVI انڈیکس')}
                      </h3>
                      <div className="text-4xl font-bold mb-2" style={{ color: mockSensingData.ndvi.color }}>
                        {mockSensingData.ndvi.value}
                      </div>
                      <Chip
                        label={mockSensingData.ndvi.status}
                        size="small"
                        sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 'bold' }}
                      />
                      <p className="text-sm text-gray-600 mt-3">
                        {t('Vegetation health indicator', 'پودوں کی صحت کا اشارہ')}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Soil Moisture Card */}
                <Grid item xs={12} md={6} lg={3}>
                  <Card sx={{ 
                    borderRadius: '24px', 
                    boxShadow: 3,
                    background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                    border: '2px solid #3B82F6'
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-4xl">{mockSensingData.soilMoisture.icon}</div>
                        <Chip
                          label="→"
                          size="small"
                          sx={{ bgcolor: '#3B82F6', color: 'white', fontWeight: 'bold' }}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-700 mb-2">
                        {t('Soil Moisture', 'مٹی کی نمی')}
                      </h3>
                      <div className="text-4xl font-bold mb-2" style={{ color: mockSensingData.soilMoisture.color }}>
                        {mockSensingData.soilMoisture.value}%
                      </div>
                      <Chip
                        label={mockSensingData.soilMoisture.status}
                        size="small"
                        sx={{ bgcolor: '#3B82F6', color: 'white', fontWeight: 'bold' }}
                      />
                      <p className="text-sm text-gray-600 mt-3">
                        {t('Current moisture level', 'موجودہ نمی کی سطح')}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Temperature Card */}
                <Grid item xs={12} md={6} lg={3}>
                  <Card sx={{ 
                    borderRadius: '24px', 
                    boxShadow: 3,
                    background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                    border: '2px solid #F59E0B'
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-4xl">{mockSensingData.temperature.icon}</div>
                        <Chip
                          label="↑"
                          size="small"
                          sx={{ bgcolor: '#F59E0B', color: 'white', fontWeight: 'bold' }}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-700 mb-2">
                        {t('Temperature', 'درجہ حرارت')}
                      </h3>
                      <div className="text-4xl font-bold mb-2" style={{ color: mockSensingData.temperature.color }}>
                        {mockSensingData.temperature.value}°C
                      </div>
                      <Chip
                        label={mockSensingData.temperature.status}
                        size="small"
                        sx={{ bgcolor: '#F59E0B', color: 'white', fontWeight: 'bold' }}
                      />
                      <p className="text-sm text-gray-600 mt-3">
                        {t('Surface temperature', 'سطح کا درجہ حرارت')}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Crop Health Card */}
                <Grid item xs={12} md={6} lg={3}>
                  <Card sx={{ 
                    borderRadius: '24px', 
                    boxShadow: 3,
                    background: 'linear-gradient(135deg, #D1FAE5 0%, #6EE7B7 100%)',
                    border: '2px solid #10B981'
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-4xl">{mockSensingData.cropHealth.icon}</div>
                        <Chip
                          label="↑"
                          size="small"
                          sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 'bold' }}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-700 mb-2">
                        {t('Crop Health', 'فصل کی صحت')}
                      </h3>
                      <div className="text-4xl font-bold mb-2" style={{ color: mockSensingData.cropHealth.color }}>
                        {mockSensingData.cropHealth.value}%
                      </div>
                      <Chip
                        label={mockSensingData.cropHealth.status}
                        size="small"
                        sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 'bold' }}
                      />
                      <p className="text-sm text-gray-600 mt-3">
                        {t('Overall health score', 'مجموعی صحت کا سکور')}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Detailed Analysis */}
              <Card sx={{ borderRadius: '24px', boxShadow: 3, mt: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    🤖 {t('AI Analysis & Recommendations', 'AI تجزیہ اور سفارشات')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                      <h4 className="font-bold text-green-900 mb-2">
                        ✓ {t('Vegetation Health: Excellent', 'پودوں کی صحت: بہترین')}
                      </h4>
                      <p className="text-green-800" style={{ direction: 'rtl', textAlign: 'right' }}>
                        NDVI قدر 0.72 ہے جو صحت مند پودوں کی نشاندہی کرتی ہے۔ فصل اچھی طرح سے بڑھ رہی ہے۔
                      </p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                      <h4 className="font-bold text-blue-900 mb-2">
                        💧 {t('Soil Moisture: Optimal', 'مٹی کی نمی: بہترین')}
                      </h4>
                      <p className="text-blue-800" style={{ direction: 'rtl', textAlign: 'right' }}>
                        مٹی میں نمی کی سطح 45% ہے جو فصل کی نشوونما کے لیے مثالی ہے۔ پانی دینے کی ضرورت نہیں۔
                      </p>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                      <h4 className="font-bold text-yellow-900 mb-2">
                        🌡️ {t('Temperature: Monitor', 'درجہ حرارت: نگرانی کریں')}
                      </h4>
                      <p className="text-yellow-800" style={{ direction: 'rtl', textAlign: 'right' }}>
                        سطح کا درجہ حرارت 28°C ہے۔ اگلے 3 دنوں میں درجہ حرارت میں اضافہ متوقع ہے۔ پانی کی ضرورت بڑھ سکتی ہے۔
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {!selectedPolygon && polygons.length === 0 && (
            <Card sx={{ borderRadius: '24px', boxShadow: 3 }}>
              <CardContent sx={{ p: 8, textAlign: 'center' }}>
                <div className="text-8xl mb-4">🗺️</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-900">
                  {t('No Farm Regions Yet', 'ابھی تک کوئی فارم علاقہ نہیں')}
                </h3>
                <p className="text-gray-600 text-lg mb-2">
                  {t('Create your first farm region to start monitoring', 'نگرانی شروع کرنے کے لیے اپنا پہلا فارم علاقہ بنائیں')}
                </p>
                <p className="text-gray-500" style={{ direction: 'rtl', textAlign: 'center' }}>
                  اوپر سے علاقہ کا نام داخل کریں اور "علاقہ شامل کریں" پر کلک کریں
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
