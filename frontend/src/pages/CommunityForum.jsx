import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Chip, TextField, MenuItem, Fab, InputAdornment } from '@mui/material';
import { Add, Search, TrendingUp, CheckCircle, Forum } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import API from '../utils/api';
import ForumPostCard from '../components/ForumPostCard';
import CreatePostDialog from '../components/CreatePostDialog';
import ForumStatsBar from '../components/ForumStatsBar';

export default function CommunityForum({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
    sortBy: 'recent'
  });

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get('/forum/posts', { params: filters });
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/forum/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
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
          <div className="rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #DBEAFE 100%)' }}>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2" style={{ color: '#042E25' }}>
                💬 Community Forum
              </h1>
              <p className="text-gray-600 text-lg">Share problems, get solutions from fellow farmers</p>
            </div>
          </div>

          {/* Stats Bar */}
          {stats && <ForumStatsBar stats={stats} />}

          {/* Filters */}
          <Card sx={{ borderRadius: '24px', boxShadow: 3, mb: 4, background: 'linear-gradient(135deg, #ffffff 0%, #F0FDF4 100%)' }}>
            <CardContent sx={{ p: 3 }}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <TextField
                  fullWidth
                  placeholder="Search posts..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="pest-disease">Pest & Disease</MenuItem>
                  <MenuItem value="soil-health">Soil Health</MenuItem>
                  <MenuItem value="irrigation">Irrigation</MenuItem>
                  <MenuItem value="fertilizer">Fertilizer</MenuItem>
                  <MenuItem value="weather">Weather</MenuItem>
                  <MenuItem value="equipment">Equipment</MenuItem>
                  <MenuItem value="market">Market</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="solved">Solved</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  select
                  label="Sort By"
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  <MenuItem value="recent">Most Recent</MenuItem>
                  <MenuItem value="popular">Most Popular</MenuItem>
                  <MenuItem value="likes">Most Liked</MenuItem>
                </TextField>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <ForumPostCard key={post._id} post={post} onUpdate={fetchPosts} />
              ))
            ) : (
              <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #FEF3C7 100%)' }}>
                <CardContent sx={{ p: 8, textAlign: 'center' }}>
                  <Forum sx={{ fontSize: 80, color: '#3B82F6', mb: 2 }} />
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">No Posts Found</h3>
                  <p className="text-gray-600 mb-4">Be the first to start a discussion!</p>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenDialog(true)}
                    sx={{
                      bgcolor: '#3B82F6',
                      '&:hover': { bgcolor: '#2563EB' },
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5
                    }}
                  >
                    Create Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Create Post Dialog */}
      <CreatePostDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        onSuccess={handlePostCreated}
      />

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenDialog(true)}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          bgcolor: '#3B82F6',
          '&:hover': { bgcolor: '#2563EB' },
          width: 64,
          height: 64
        }}
      >
        <Add sx={{ fontSize: 32 }} />
      </Fab>
    </div>
  );
}
