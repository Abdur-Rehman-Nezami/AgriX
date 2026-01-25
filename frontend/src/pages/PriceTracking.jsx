import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Button, TextField, MenuItem } from '@mui/material';
import API from '../utils/api';
import PriceTable from '../components/PriceTable';
import ComparisonChart from '../components/ComparisonChart';
import HistoricalPriceChart from '../components/HistoricalPriceChart';
import Sidebar from '../components/Sidebar';

export default function PriceTracking({ user }) {
  const [tab, setTab] = useState(0);
  const [prices, setPrices] = useState([]);
  const [form, setForm] = useState({ crop: '', price: '', region: '', date: new Date().toISOString().split('T')[0] });
  const [filters, setFilters] = useState({ source: '', crop: '', region: '' });
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    fetchPrices();
  }, [tab, filters]);

  const fetchPrices = async () => {
    const source = tab === 0 ? 'farmer' : tab === 1 ? 'admin' : 'gov';
    
    try {
      const { data } = await API.get('/prices', { params: { ...filters, source } });
      setPrices(data);
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      setPrices([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/prices', form);
      alert('Price added successfully');
      setForm({ crop: '', price: '', region: '', date: new Date().toISOString().split('T')[0] });
      fetchPrices();
    } catch (error) {
      alert('Failed to add price');
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
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h1 className="text-5xl font-bold mb-4 text-green">📊 Price Tracking Center</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <TextField label="Crop" value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })} required />
            <TextField label="Price (PKR)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <TextField label="Region" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} required />
            <TextField label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            <Button type="submit" variant="contained" sx={{ bgcolor: '#34D399', '&:hover': { bgcolor: '#10B981' }, borderRadius: '12px' }}>Add Price</Button>
          </form>

          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 4 }}>
            <Tab label="Farmer Data" />
            <Tab label="Admin Data" />
            <Tab label="Government Data" />
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <TextField label="Filter by Crop" value={filters.crop} onChange={(e) => setFilters({ ...filters, crop: e.target.value })} />
            <TextField label="Filter by Region" value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })} />
            <Button variant="outlined" onClick={() => setFilters({ source: '', crop: '', region: '' })}>Clear Filters</Button>
          </div>

          <PriceTable prices={prices} />
        </div>

        {/* Historical Price Trends */}
        <div className="mb-8">
          <HistoricalPriceChart />
        </div>

          {/* Comparison Chart */}
          <ComparisonChart />
        </div>
      </div>
    </div>
  );
}
