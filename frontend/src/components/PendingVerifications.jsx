import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import API from '../utils/api';

export default function PendingVerifications({ onVerify }) {
  const [pendingPrices, setPendingPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingPrices();
  }, []);

  const fetchPendingPrices = async () => {
    try {
      const { data } = await API.get('/admin/pending-prices');
      setPendingPrices(data);
    } catch (error) {
      console.error('Failed to fetch pending prices:', error);
    }
  };

  const handleVerify = async (priceId, status) => {
    setLoading(true);
    try {
      await API.put(`/admin/verify-price/${priceId}`, { verified: status });
      alert(`Price ${status ? 'verified' : 'rejected'} successfully`);
      fetchPendingPrices();
      if (onVerify) onVerify();
    } catch (error) {
      alert('Failed to update price status');
    }
    setLoading(false);
  };

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #FEF3C7 100%)' }}>
      <CardContent sx={{ p: 4 }}>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
          ⏳ Pending Verifications
        </h3>

        {pendingPrices.length > 0 ? (
          <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: '16px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#FEF3C7' }}>Crop</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#FEF3C7' }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#FEF3C7' }}>Region</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#FEF3C7' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#FEF3C7' }}>Source</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#FEF3C7' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingPrices.map((price) => (
                  <TableRow key={price._id} hover>
                    <TableCell sx={{ fontWeight: 'bold' }}>{price.crop}</TableCell>
                    <TableCell sx={{ color: '#10B981', fontWeight: 'bold' }}>₨{price.price}</TableCell>
                    <TableCell>{price.region}</TableCell>
                    <TableCell>{new Date(price.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={price.source.toUpperCase()} 
                        size="small"
                        sx={{ bgcolor: '#D1FAE5', color: '#042E25', fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<CheckCircle />}
                          onClick={() => handleVerify(price._id, true)}
                          disabled={loading}
                          sx={{ 
                            bgcolor: '#10B981', 
                            '&:hover': { bgcolor: '#059669' },
                            borderRadius: '8px'
                          }}
                        >
                          Verify
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={() => handleVerify(price._id, false)}
                          disabled={loading}
                          sx={{ 
                            borderColor: '#EF4444',
                            color: '#EF4444',
                            '&:hover': { borderColor: '#DC2626', bgcolor: '#FEE2E2' },
                            borderRadius: '8px'
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="text-center py-12 bg-white/60 rounded-2xl">
            <p className="text-gray-600 text-lg">No pending verifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
