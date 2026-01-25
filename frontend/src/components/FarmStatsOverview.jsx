import React from 'react';
import { Landscape, SquareFoot, Warning, Event } from '@mui/icons-material';

export default function FarmStatsOverview({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-2xl p-5 border border-green-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Landscape sx={{ color: '#10B981', fontSize: 32 }} />
          <h3 className="font-semibold text-lg text-gray-900">Total Regions</h3>
        </div>
        <p className="text-3xl font-bold text-green-600">{stats.totalRegions}</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <SquareFoot sx={{ color: '#3B82F6', fontSize: 32 }} />
          <h3 className="font-semibold text-lg text-gray-900">Total Area</h3>
        </div>
        <p className="text-3xl font-bold text-blue-600">{stats.totalArea} acres</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Warning sx={{ color: '#F59E0B', fontSize: 32 }} />
          <h3 className="font-semibold text-lg text-gray-900">Active Issues</h3>
        </div>
        <p className="text-3xl font-bold text-orange-600">{stats.activeIssues}</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Event sx={{ color: '#8B5CF6', fontSize: 32 }} />
          <h3 className="font-semibold text-lg text-gray-900">Recent Activities</h3>
        </div>
        <p className="text-3xl font-bold text-purple-600">{stats.recentActivities}</p>
      </div>
    </div>
  );
}
