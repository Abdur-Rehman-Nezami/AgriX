import React from 'react';
import { Card, CardContent, Chip, Avatar, IconButton } from '@mui/material';
import { ThumbUp, Visibility, Comment, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ForumPostCard({ post, onUpdate }) {
  const navigate = useNavigate();

  const getCategoryColor = (category) => {
    const colors = {
      'pest-disease': '#EF4444',
      'soil-health': '#8B4513',
      'irrigation': '#3B82F6',
      'fertilizer': '#10B981',
      'weather': '#F59E0B',
      'equipment': '#6B7280',
      'market': '#8B5CF6',
      'general': '#6B7280'
    };
    return colors[category] || '#6B7280';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'pest-disease': 'Pest & Disease',
      'soil-health': 'Soil Health',
      'irrigation': 'Irrigation',
      'fertilizer': 'Fertilizer',
      'weather': 'Weather',
      'equipment': 'Equipment',
      'market': 'Market',
      'general': 'General'
    };
    return labels[category] || category;
  };

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <Card 
      sx={{ 
        borderRadius: '20px', 
        boxShadow: 2,
        transition: 'all 0.3s',
        '&:hover': { 
          boxShadow: 6,
          transform: 'translateY(-2px)'
        },
        cursor: 'pointer',
        border: post.solved ? '2px solid #10B981' : 'none'
      }}
      onClick={() => navigate(`/forum/${post._id}`)}
    >
      <CardContent sx={{ p: 3 }}>
        <div className="flex gap-4">
          {/* User Avatar */}
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48, 
              bgcolor: '#3B82F6',
              fontSize: '1.2rem'
            }}
          >
            {post.userId?.name?.charAt(0).toUpperCase()}
          </Avatar>

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{post.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">{post.userId?.name}</span>
                  <span>•</span>
                  <span>{post.userId?.region}</span>
                  <span>•</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
              {post.solved && (
                <Chip 
                  icon={<CheckCircle />}
                  label="Solved" 
                  size="small"
                  sx={{ 
                    bgcolor: '#D1FAE5', 
                    color: '#065F46',
                    fontWeight: 'bold'
                  }}
                />
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-3 line-clamp-2">{post.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Chip 
                label={getCategoryLabel(post.category)}
                size="small"
                sx={{ 
                  bgcolor: `${getCategoryColor(post.category)}20`,
                  color: getCategoryColor(post.category),
                  fontWeight: 'bold',
                  fontSize: '0.75rem'
                }}
              />
              {post.crop && (
                <Chip 
                  label={post.crop}
                  size="small"
                  sx={{ bgcolor: '#FEF3C7', color: '#92400E', fontWeight: 'bold' }}
                />
              )}
              {post.tags?.slice(0, 2).map((tag, index) => (
                <Chip 
                  key={index}
                  label={tag}
                  size="small"
                  sx={{ bgcolor: '#F3F4F6', color: '#374151' }}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <ThumbUp sx={{ fontSize: 18 }} />
                <span className="text-sm font-semibold">{post.likes?.length || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Visibility sx={{ fontSize: 18 }} />
                <span className="text-sm font-semibold">{post.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Comment sx={{ fontSize: 18 }} />
                <span className="text-sm font-semibold">Replies</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
