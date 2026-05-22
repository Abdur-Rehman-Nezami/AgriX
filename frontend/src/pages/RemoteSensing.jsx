import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, MenuItem, Grid, Chip, CircularProgress } from '@mui/material';
import { Satellite, Analytics, TrendingUp, Warning } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';

export default function RemoteSensing({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [form, setForm] = useState({
    dataType: 'ndvi',
    values: '',
    crop: '',
    region: user?.region || '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Parse values (comma-separated or single value)
      const parsedValues = form.values.includes(',') 
        ? form.values.split(',').map(v => parseFloat(v.trim()))
        : parseFloat(form.values);

      const { data } = await API.post('/remote-sensing/analyze', {
        ...form,
        values: parsedValues
      });

      setResult(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('تجزیہ میں خرابی۔ براہ کرم دوبارہ کوشش کریں۔');
    }
    
    setLoading(false);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#EF4444',
      medium: '#F59E0B',
      low: '#10B981'
    };
    return colors[priority] || '#6B7280';
  };

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
          {/* Header */}
          <div className="rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #E0E7FF 100%)' }}>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2" style={{ color: '#042E25' }}>
                🛰️ Remote Sensing Analysis
              </h1>
              <p className="text-gray-600 text-lg">Analyze satellite and drone data with AI</p>
              <p className="text-gray-600 text-sm mt-1" style={{ direction: 'rtl' }}>
                سیٹلائٹ اور ڈرون ڈیٹا کا AI سے تجزیہ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #F0FDF4 100%)' }}>
              <CardContent sx={{ p: 4 }}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <Satellite /> Data Input
                </h2>

                <form onSubmit={handleAnalyze}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        select
                        label="Data Type"
                        value={form.dataType}
                        onChange={(e) => setForm({ ...form, dataType: e.target.value })}
                        required
                        sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      >
                        <MenuItem value="ndvi">NDVI (Vegetation Index)</MenuItem>
                        <MenuItem value="ndwi">NDWI (Water Index)</MenuItem>
                        <MenuItem value="soil-moisture">Soil Moisture (%)</MenuItem>
                        <MenuItem value="temperature">Surface Temperature (°C)</MenuItem>
                        <MenuItem value="custom">Custom Data</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Values"
                        value={form.values}
                        onChange={(e) => setForm({ ...form, values: e.target.value })}
                        required
                        placeholder="e.g., 0.65 or 0.5,0.6,0.7,0.8"
                        helperText="Single value or comma-separated values"
                        sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Crop"
                        value={form.crop}
                        onChange={(e) => setForm({ ...form, crop: e.target.value })}
                        placeholder="e.g., Wheat, Rice"
                        sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Region"
                        value={form.region}
                        onChange={(e) => setForm({ ...form, region: e.target.value })}
                        sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Additional Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Any additional information..."
                        sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <Analytics />}
                        sx={{
                          bgcolor: '#3B82F6',
                          '&:hover': { bgcolor: '#2563EB' },
                          borderRadius: '16px',
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {loading ? 'Analyzing...' : 'Analyze Data'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {result ? (
                <>
                  {/* Summary Statistics */}
                  {result.summary && (
                    <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #DBEAFE 100%)' }}>
                      <CardContent sx={{ p: 4 }}>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">📊 Summary Statistics</h3>
                        {result.summary.type === 'array' ? (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-gray-600 text-sm">Average</p>
                              <p className="text-2xl font-bold text-blue-600">{result.summary.average}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-gray-600 text-sm">Range</p>
                              <p className="text-lg font-bold text-gray-900">{result.summary.min} - {result.summary.max}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-gray-600 text-sm">Std Dev</p>
                              <p className="text-xl font-bold text-gray-900">{result.summary.stdDev}</p>
                            </div>
                            <div className="bg-white/60 rounded-xl p-3">
                              <p className="text-gray-600 text-sm">Data Points</p>
                              <p className="text-xl font-bold text-gray-900">{result.summary.count}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white/60 rounded-xl p-4 text-center">
                            <p className="text-gray-600 text-sm">Value</p>
                            <p className="text-3xl font-bold text-blue-600">{result.summary.value}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* AI Analysis */}
                  <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #FEF3C7 100%)' }}>
                    <CardContent sx={{ p: 4 }}>
                      <h3 className="text-xl font-bold mb-4 text-gray-900">🤖 AI Analysis</h3>
                      <div className="bg-white/80 rounded-xl p-4" style={{ direction: 'rtl', textAlign: 'right' }}>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                          {result.analysis}
                        </p>
                      </div>
                      {result.fallback && (
                        <p className="text-xs text-gray-500 mt-2">* Using fallback analysis</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  {result.recommendations && result.recommendations.length > 0 && (
                    <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}>
                      <CardContent sx={{ p: 4 }}>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">💡 Recommendations</h3>
                        <div className="space-y-3">
                          {result.recommendations.map((rec, index) => (
                            <div 
                              key={index}
                              className="bg-white/80 rounded-xl p-4 border-l-4"
                              style={{ borderLeftColor: getPriorityColor(rec.priority) }}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-gray-900" style={{ direction: 'rtl', textAlign: 'right', flex: 1 }}>
                                  {rec.title}
                                </h4>
                                <Chip 
                                  label={rec.priority.toUpperCase()}
                                  size="small"
                                  sx={{ 
                                    bgcolor: `${getPriorityColor(rec.priority)}20`,
                                    color: getPriorityColor(rec.priority),
                                    fontWeight: 'bold'
                                  }}
                                />
                              </div>
                              <p className="text-gray-700" style={{ direction: 'rtl', textAlign: 'right' }}>
                                {rec.action}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #F3F4F6 100%)' }}>
                  <CardContent sx={{ p: 8, textAlign: 'center' }}>
                    <Satellite sx={{ fontSize: 80, color: '#3B82F6', mb: 2 }} />
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">No Analysis Yet</h3>
                    <p className="text-gray-600">Enter your remote sensing data and click Analyze</p>
                    <p className="text-gray-500 text-sm mt-2" style={{ direction: 'rtl' }}>
                      اپنا ڈیٹا داخل کریں اور تجزیہ کریں
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
