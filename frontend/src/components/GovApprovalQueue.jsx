import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, TextField, Chip
} from '@mui/material';
import { CheckCircle, Cancel, Refresh } from '@mui/icons-material';
import API from '../utils/api';

export default function GovApprovalQueue({ onApprove }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/admin/gov-submissions');
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, status) => {
    try {
      await API.put(`/admin/approve-gov-price/${id}`, { 
        status, 
        adminNotes: status === 'rejected' ? adminNotes : '' 
      });
      fetchSubmissions();
      onApprove();
      setDialogOpen(false);
      setAdminNotes('');
    } catch (error) {
      alert('Failed to process approval: ' + error.response?.data?.message);
    }
  };

  const openRejectDialog = (submission) => {
    setSelectedSubmission(submission);
    setDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#042E25' }}>
          Government Rate Approvals
        </h2>
        <Tooltip title="Refresh">
          <IconButton onClick={fetchSubmissions} sx={{ color: '#F59E0B' }}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </div>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#FEF3C7' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Submitted By</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Crop</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Region</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                  No pending government rate submissions
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission._id} hover>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{submission.userId?.name}</div>
                      <div className="text-sm text-gray-500">{submission.userId?.email}</div>
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{submission.crop}</TableCell>
                  <TableCell>PKR {submission.price}</TableCell>
                  <TableCell>{submission.unit}</TableCell>
                  <TableCell>{submission.region}</TableCell>
                  <TableCell>{new Date(submission.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Tooltip title="Approve">
                        <IconButton 
                          onClick={() => handleApprove(submission._id, 'approved')}
                          sx={{ color: '#10B981' }}
                        >
                          <CheckCircle />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton 
                          onClick={() => openRejectDialog(submission)}
                          sx={{ color: '#EF4444' }}
                        >
                          <Cancel />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reject Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#FEE2E2', fontWeight: 'bold' }}>
          Reject Government Rate
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <p className="mb-4 text-gray-700">
            Are you sure you want to reject this rate submission?
          </p>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Admin Notes (Optional)"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Provide reason for rejection..."
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: '#6B7280' }}>
            Cancel
          </Button>
          <Button 
            onClick={() => handleApprove(selectedSubmission?._id, 'rejected')}
            variant="contained"
            sx={{ 
              bgcolor: '#EF4444',
              '&:hover': { bgcolor: '#DC2626' }
            }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
