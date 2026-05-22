import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import API from '../utils/api';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

export default function PriceAnalytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await API.get('/admin/price-analytics');
      setData(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}>
      <CardContent sx={{ p: 4 }}>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">📊 Price Distribution</h3>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
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
