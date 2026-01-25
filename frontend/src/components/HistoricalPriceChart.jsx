import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, ToggleButton, ToggleButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import API from '../utils/api';

export default function HistoricalPriceChart() {
  const [crop, setCrop] = useState('Wheat');
  const [period, setPeriod] = useState('7days');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const fetchHistoricalData = async () => {
    if (!crop) {
      alert('Please enter a crop name');
      return;
    }

    setLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      
      if (period === '7days') {
        startDate.setDate(startDate.getDate() - 7);
      } else {
        startDate.setDate(startDate.getDate() - 30);
      }

      const { data: result } = await API.get('/prices', {
        params: {
          crop,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });

      // Format data for chart
      const formattedData = result.map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: item.price,
        region: item.region,
        source: item.source,
        fullDate: new Date(item.date)
      })).sort((a, b) => a.fullDate - b.fullDate);

      setData(formattedData);

      // Calculate statistics
      if (formattedData.length > 0) {
        const prices = formattedData.map(d => d.price);
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const latestPrice = prices[prices.length - 1];
        const oldestPrice = prices[0];
        const priceChange = latestPrice - oldestPrice;
        const percentChange = ((priceChange / oldestPrice) * 100).toFixed(2);

        setStats({
          average: avgPrice.toFixed(2),
          min: minPrice,
          max: maxPrice,
          latest: latestPrice,
          change: priceChange.toFixed(2),
          percentChange,
          trend: priceChange >= 0 ? 'up' : 'down'
        });
      }
    } catch (error) {
      console.error('Failed to fetch historical data:', error);
      alert('Failed to fetch data. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}>
      <CardContent sx={{ p: 4 }}>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          📈 Historical Price Trends
        </h3>

        {/* Search Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <TextField
            label="Crop/Fruit/Vegetable"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder="e.g., Wheat, Apple, Tomato"
            sx={{
              flex: 1,
              bgcolor: 'white',
              borderRadius: '12px',
              '& .MuiOutlinedInput-root': { borderRadius: '12px' }
            }}
          />
          
          <ToggleButtonGroup
            value={period}
            exclusive
            onChange={(e, newPeriod) => newPeriod && setPeriod(newPeriod)}
            sx={{ bgcolor: 'white', borderRadius: '12px' }}
          >
            <ToggleButton value="7days" sx={{ px: 3, borderRadius: '12px' }}>
              Last 7 Days
            </ToggleButton>
            <ToggleButton value="30days" sx={{ px: 3, borderRadius: '12px' }}>
              Last 30 Days
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="contained"
            onClick={fetchHistoricalData}
            disabled={loading}
            sx={{
              bgcolor: '#10B981',
              '&:hover': { bgcolor: '#059669' },
              borderRadius: '12px',
              px: 4,
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Loading...' : 'Search'}
          </Button>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white/90 rounded-xl p-4 text-center shadow-md">
              <p className="text-gray-600 text-sm mb-1">Average</p>
              <p className="text-2xl font-bold text-gray-900">₨{stats.average}</p>
            </div>
            <div className="bg-white/90 rounded-xl p-4 text-center shadow-md">
              <p className="text-gray-600 text-sm mb-1">Minimum</p>
              <p className="text-2xl font-bold text-blue-600">₨{stats.min}</p>
            </div>
            <div className="bg-white/90 rounded-xl p-4 text-center shadow-md">
              <p className="text-gray-600 text-sm mb-1">Maximum</p>
              <p className="text-2xl font-bold text-orange-600">₨{stats.max}</p>
            </div>
            <div className="bg-white/90 rounded-xl p-4 text-center shadow-md">
              <p className="text-gray-600 text-sm mb-1">Latest</p>
              <p className="text-2xl font-bold text-gray-900">₨{stats.latest}</p>
            </div>
            <div className="bg-white/90 rounded-xl p-4 text-center shadow-md">
              <p className="text-gray-600 text-sm mb-1">Change</p>
              <div className="flex items-center justify-center gap-1">
                {stats.trend === 'up' ? (
                  <TrendingUp sx={{ color: '#10B981', fontSize: 20 }} />
                ) : (
                  <TrendingDown sx={{ color: '#EF4444', fontSize: 20 }} />
                )}
                <p className={`text-xl font-bold ${stats.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.percentChange}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {data.length > 0 ? (
          <>
            <div className="bg-white/90 rounded-2xl p-6 mb-6 shadow-lg">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: 'Price (PKR)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #D1FAE5' }}
                    formatter={(value) => [`₨${value}`, 'Price']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Price (PKR)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Data Table */}
            <div className="bg-white/90 rounded-2xl shadow-lg overflow-hidden">
              <TableContainer component={Paper} sx={{ maxHeight: 400, bgcolor: 'transparent' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: '#D1FAE5' }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: '#D1FAE5' }}>Price (PKR)</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: '#D1FAE5' }}>Region</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: '#D1FAE5' }}>Source</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{row.date}</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#10B981' }}>₨{row.price}</TableCell>
                        <TableCell>{row.region}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            row.source === 'gov' ? 'bg-blue-100 text-blue-800' :
                            row.source === 'admin' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {row.source.toUpperCase()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white/60 rounded-2xl">
            <p className="text-gray-600 text-lg">
              {loading ? 'Loading data...' : 'Enter a crop name and click Search to view historical prices'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
