import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Fab } from '@mui/material';
import { Add, Grass, Warning, TrendingUp } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';
import FarmRegionCard from '../components/FarmRegionCard';
import AddRegionDialog from '../components/AddRegionDialog';
import FarmStatsOverview from '../components/FarmStatsOverview';

export default function FarmTracking({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [regions, setRegions] = useState([]);
  const [stats, setStats] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchRegions();
    fetchStats();
  }, []);

  const fetchRegions = async () => {
    try {
      const { data } = await API.get('/farm/regions');
      setRegions(data);
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/farm/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleAddRegion = () => {
    setOpenDialog(true);
  };

  const handleRegionAdded = () => {
    fetchRegions();
    fetchStats();
    setOpenDialog(false);
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
          <div className="rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2" style={{ color: '#042E25' }}>
                🌾 My Farm Tracking
              </h1>
              <p className="text-gray-600 text-lg">Manage and monitor your farm regions</p>
            </div>
          </div>

          {/* Stats Overview */}
          {stats && <FarmStatsOverview stats={stats} />}

          {/* Regions Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Farm Regions</h2>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddRegion}
                sx={{
                  bgcolor: '#10B981',
                  '&:hover': { bgcolor: '#059669' },
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                Add Region
              </Button>
            </div>

            {regions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regions.map((region) => (
                  <FarmRegionCard 
                    key={region._id} 
                    region={region} 
                    onUpdate={fetchRegions}
                  />
                ))}
              </div>
            ) : (
              <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #FEF3C7 100%)' }}>
                <CardContent sx={{ p: 8, textAlign: 'center' }}>
                  <Grass sx={{ fontSize: 80, color: '#10B981', mb: 2 }} />
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">No Farm Regions Yet</h3>
                  <p className="text-gray-600 mb-4">Start tracking your farm by adding your first region</p>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddRegion}
                    sx={{
                      bgcolor: '#10B981',
                      '&:hover': { bgcolor: '#059669' },
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5
                    }}
                  >
                    Add First Region
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Add Region Dialog */}
      <AddRegionDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        onSuccess={handleRegionAdded}
      />

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddRegion}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          bgcolor: '#10B981',
          '&:hover': { bgcolor: '#059669' },
          width: 64,
          height: 64
        }}
      >
        <Add sx={{ fontSize: 32 }} />
      </Fab>
    </div>
  );
}
