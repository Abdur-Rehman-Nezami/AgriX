import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import API from '../utils/api';

export default function AdminStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/admin/monthly-stats');
      setData(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #DBEAFE 100%)' }}>
      <CardContent sx={{ p: 4 }}>
        <h3 className="text-3xl font-bold mb-6 text-gray-900">📈 Monthly Price Entries</h3>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="farmer" fill="#10B981" name="Farmer" />
              <Bar dataKey="admin" fill="#3B82F6" name="Admin" />
              <Bar dataKey="gov" fill="#F59E0B" name="Government" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
