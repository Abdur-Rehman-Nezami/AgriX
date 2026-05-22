import React, { useState, useEffect } from 'react';
import { Card, CardContent, Avatar, Chip } from '@mui/material';
import { People, Verified, TrendingUp, Assessment } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';
import AdminStats from '../components/AdminStats';
import PendingVerifications from '../components/PendingVerifications';
import UserManagement from '../components/UserManagement';
import PriceAnalytics from '../components/PriceAnalytics';
import GovApprovalQueue from '../components/GovApprovalQueue';

export default function AdminDashboard({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrices: 0,
    pendingVerifications: 0,
    verifiedToday: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
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
          {/* Admin Header */}
          <div className="rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #DBEAFE 100%)' }}>
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-6">
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: '#3B82F6',
                    fontSize: '2.5rem',
                    border: '4px solid white',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <h1 className="text-4xl font-bold mb-2" style={{ color: '#042E25' }}>
                    Admin Dashboard
                  </h1>
                  <div className="flex gap-3">
                    <Chip 
                      label="ADMIN" 
                      sx={{ 
                        bgcolor: '#3B82F6', 
                        color: '#fff', 
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }} 
                    />
                    <Chip 
                      label={user.name}
                      sx={{ 
                        bgcolor: '#DBEAFE', 
                        color: '#042E25', 
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }} 
                    />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-blue-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <People sx={{ color: '#3B82F6', fontSize: 32 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>Total Users</h3>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: '#3B82F6' }}>{stats.totalUsers}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-green-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp sx={{ color: '#10B981', fontSize: 32 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>Total Prices</h3>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: '#10B981' }}>{stats.totalPrices}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-orange-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Assessment sx={{ color: '#F59E0B', fontSize: 32 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>Pending</h3>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: '#F59E0B' }}>{stats.pendingVerifications}</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-purple-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Verified sx={{ color: '#8B5CF6', fontSize: 32 }} />
                    <h3 className="font-semibold text-lg" style={{ color: '#042E25' }}>Verified Today</h3>
                  </div>
                  <p className="text-3xl font-bold" style={{ color: '#8B5CF6' }}>{stats.verifiedToday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Government Rate Approvals */}
          <div className="mb-8">
            <GovApprovalQueue onApprove={fetchStats} />
          </div>

          {/* Pending Verifications */}
          <div className="mb-8">
            <PendingVerifications onVerify={fetchStats} />
          </div>

          {/* User Management & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <UserManagement />
            <PriceAnalytics />
          </div>

          {/* Admin Stats */}
          <AdminStats />
        </div>
      </div>
    </div>
  );
}
