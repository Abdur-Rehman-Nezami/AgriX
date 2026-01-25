import React from 'react';
import { Forum, CheckCircle, Create, Reply } from '@mui/icons-material';

export default function ForumStatsBar({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Forum sx={{ color: '#3B82F6', fontSize: 28 }} />
          <h3 className="font-semibold text-sm text-gray-900">Total Posts</h3>
        </div>
        <p className="text-3xl font-bold text-blue-600">{stats.totalPosts}</p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-green-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle sx={{ color: '#10B981', fontSize: 28 }} />
          <h3 className="font-semibold text-sm text-gray-900">Solved</h3>
        </div>
        <p className="text-3xl font-bold text-green-600">{stats.solvedPosts}</p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-purple-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Create sx={{ color: '#8B5CF6', fontSize: 28 }} />
          <h3 className="font-semibold text-sm text-gray-900">My Posts</h3>
        </div>
        <p className="text-3xl font-bold text-purple-600">{stats.myPosts}</p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-orange-200 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Reply sx={{ color: '#F59E0B', fontSize: 28 }} />
          <h3 className="font-semibold text-sm text-gray-900">My Replies</h3>
        </div>
        <p className="text-3xl font-bold text-orange-600">{stats.myReplies}</p>
      </div>
    </div>
  );
}
