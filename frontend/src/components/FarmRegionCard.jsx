import React from 'react';
import { Card, CardContent, Chip, IconButton } from '@mui/material';
import { Edit, Visibility, Warning } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function FarmRegionCard({ region, onUpdate }) {
  const navigate = useNavigate();

  const getHealthColor = (health) => {
    const colors = {
      excellent: '#10B981',
      good: '#34D399',
      fair: '#F59E0B',
      poor: '#EF4444',
      critical: '#DC2626'
    };
    return colors[health] || '#6B7280';
  };

  const getStageLabel = (stage) => {
    const labels = {
      preparation: 'Preparation',
      planting: 'Planting',
      growing: 'Growing',
      flowering: 'Flowering',
      harvesting: 'Harvesting',
      fallow: 'Fallow'
    };
    return labels[stage] || stage;
  };

  const activeIssues = region.currentIssues?.filter(i => !i.resolved).length || 0;

  return (
    <Card 
      sx={{ 
        borderRadius: '24px', 
        boxShadow: 3, 
        background: 'linear-gradient(135deg, #ffffff 0%, #F0FDF4 100%)',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'translateY(-8px)' },
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/farm-tracking/${region._id}`)}
    >
      <CardContent sx={{ p: 3 }}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{region.regionName}</h3>
            <p className="text-gray-600">{region.crop}</p>
          </div>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${getHealthColor(region.healthStatus)}20` }}
          >
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: getHealthColor(region.healthStatus) }}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <Chip 
            label={getStageLabel(region.currentStage)}
            size="small"
            sx={{ bgcolor: '#DBEAFE', color: '#1E40AF', fontWeight: 'bold' }}
          />
          <Chip 
            label={`${region.area} ${region.areaUnit}`}
            size="small"
            sx={{ bgcolor: '#FEF3C7', color: '#92400E', fontWeight: 'bold' }}
          />
        </div>

        {activeIssues > 0 && (
          <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg mb-3">
            <Warning sx={{ color: '#F59E0B', fontSize: 20 }} />
            <span className="text-sm font-semibold text-orange-800">
              {activeIssues} Active Issue{activeIssues > 1 ? 's' : ''}
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-600">Soil pH</p>
            <p className="font-bold text-gray-900">{region.soilPH || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">Health</p>
            <p className="font-bold" style={{ color: getHealthColor(region.healthStatus) }}>
              {region.healthStatus}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
