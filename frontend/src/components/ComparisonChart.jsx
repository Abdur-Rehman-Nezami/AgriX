import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import API from '../utils/api';

export default function ComparisonChart() {
  const [crops, setCrops] = useState('Wheat,Rice,Cotton');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch comparison data on initial load
    fetchComparison();
  }, []);

  const fetchComparison = async () => {
    try {
      const { data: result } = await API.get('/prices/comparison', { params: { crops } });
      const formatted = result.reduce((acc, item) => {
        const existing = acc.find(d => d.date === item._id.date);
        if (existing) {
          existing[item._id.crop] = item.avgPrice;
        } else {
          acc.push({ date: item._id.date, [item._id.crop]: item.avgPrice });
        }
        return acc;
      }, []);
      setData(formatted);
    } catch (error) {
      console.error('Failed to fetch comparison:', error);
      setData([]);
    }
  };

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: 3, p: 2 }}>
      <CardContent>
        <h3 className="text-3xl font-bold mb-4 text-blue">📈 Price Comparison</h3>
        <div className="flex gap-4 mb-6">
          <TextField fullWidth label="Enter crops (comma-separated)" placeholder="e.g. Apple,Guava,Mango" value={crops} onChange={(e) => setCrops(e.target.value)} />
          <Button variant="contained" onClick={fetchComparison} sx={{ bgcolor: '#60A5FA', '&:hover': { bgcolor: '#3B82F6' }, borderRadius: '12px' }}>Compare</Button>
        </div>
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(data[0]).filter(k => k !== 'date').map((crop, i) => (
                <Line key={crop} type="monotone" dataKey={crop} stroke={['#34D399', '#60A5FA', '#FCD34D'][i % 3]} strokeWidth={2} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
