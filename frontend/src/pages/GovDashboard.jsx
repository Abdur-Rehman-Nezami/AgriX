import React, { useState, useEffect } from 'react';
import { Card, CardContent, Avatar, Chip, TextField, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Gavel, TrendingUp, Assessment, CheckCircle, Pending } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';
import GovPriceSubmissions from '../components/GovPriceSubmissions';

export default function GovDashboard({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    approvedSubmissions: 0,
    pendingSubmissions: 0,
    rejectedSubmissions: 0
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    crop: '',
    price: '',
    unit: 'per 40kg',
    region: ''
  });

  const crops = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Potato', 'Onion', 'Tomato'];
  const regions = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad'];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/gov/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/gov/prices', formData);
      setOpenDialog(false);
      setFormData({ crop: '', price: '', unit: 'per 40kg', region: '' });
      fetchStats();
      alert('Government rate submitted successfully! Awaiting admin approval.');
    } catch (error) {
      alert('Failed to submit rate: ' + error.response?.data?.message);
    }
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
          {/* Government Official Header */}
          <div className="rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FEF3C7 100%)' }}>
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-6">
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: '#F59E0B',
                    fontSize: '2.5rem',
                    border: '4px solid white',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <h1 className="text-4xl font-bold mb-2" style={{ color: '#042E25' }}>
                    Government Official Dashboard
                  </h1>
                  <div className="flex gap-3">
                    <Chip 
                      label="GOVERNMENT OFFICIAL" 
                      sx={{ 
                        bgcolor: '#F59E0B', 
                        color: '#fff', 
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }} 
                    />
                    <Chip 
                      label={user.name}
                      sx={{ 
                        bgcolor: '#FEF3C7', 
                        color: '#042E25', 
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }} 
                    />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-orange-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Assessment sx={{ color: '#F59E0B', fontSize: 32 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>Total Submissions</h3>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: '#F59E0B' }}>{stats.totalSubmissions}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-green-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle sx={{ color: '#10B981', fontSize: 32 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>Approved</h3>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: '#10B981' }}>{stats.approvedSubmissions}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-yellow-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Pending sx={{ color: '#EAB308', fontSize: 32 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>Pending</h3>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: '#EAB308' }}>{stats.pendingSubmissions}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-red-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp sx={{ color: '#EF4444', fontSize: 32 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>Rejected</h3>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: '#EF4444' }}>{stats.rejectedSubmissions}</p>
                </div>
              </div>

              {/* Submit New Rate Button */}
              <Button
                variant="contained"
                startIcon={<Gavel />}
                onClick={() => setOpenDialog(true)}
                sx={{
                  bgcolor: '#F59E0B',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '12px 32px',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#D97706'
                  }
                }}
              >
                Submit New Government Rate
              </Button>
            </div>
          </div>

          {/* Price Submissions Table */}
          <GovPriceSubmissions onUpdate={fetchStats} />
        </div>
      </div>

      {/* Submit Rate Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#FEF3C7', fontWeight: 'bold', fontSize: '1.5rem' }}>
          Submit Government Rate
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              select
              fullWidth
              label="Crop"
              value={formData.crop}
              onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
              required
              sx={{ mb: 2 }}
            >
              {crops.map((crop) => (
                <MenuItem key={crop} value={crop}>{crop}</MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Price (PKR)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="per 40kg">per 40kg</MenuItem>
              <MenuItem value="per kg">per kg</MenuItem>
              <MenuItem value="per ton">per ton</MenuItem>
            </TextField>

            <TextField
              select
              fullWidth
              label="Region"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              required
            >
              {regions.map((region) => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: '#6B7280' }}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ 
                bgcolor: '#F59E0B',
                '&:hover': { bgcolor: '#D97706' }
              }}
            >
              Submit for Approval
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
