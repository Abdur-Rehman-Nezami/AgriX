import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Chip, IconButton, Tooltip 
} from '@mui/material';
import { Refresh, CheckCircle, Cancel, HourglassEmpty } from '@mui/icons-material';
import API from '../utils/api';

export default function GovPriceSubmissions({ onUpdate }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/gov/my-submissions');
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'approved':
        return <Chip label="Approved" color="success" size="small" icon={<CheckCircle />} />;
      case 'rejected':
        return <Chip label="Rejected" color="error" size="small" icon={<Cancel />} />;
      default:
        return <Chip label="Pending" color="warning" size="small" icon={<HourglassEmpty />} />;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#042E25' }}>
          My Rate Submissions
        </h2>
        <Tooltip title="Refresh">
          <IconButton 
            onClick={() => {
              fetchSubmissions();
              onUpdate();
            }}
            sx={{ color: '#F59E0B' }}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#FEF3C7' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Crop</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Region</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Admin Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: '#6B7280' }}>
                  No submissions yet. Submit your first government rate!
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission._id} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{submission.crop}</TableCell>
                  <TableCell>PKR {submission.price}</TableCell>
                  <TableCell>{submission.unit}</TableCell>
                  <TableCell>{submission.region}</TableCell>
                  <TableCell>{new Date(submission.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusChip(submission.govApprovalStatus)}</TableCell>
                  <TableCell sx={{ color: '#6B7280', fontStyle: 'italic' }}>
                    {submission.adminNotes || '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
