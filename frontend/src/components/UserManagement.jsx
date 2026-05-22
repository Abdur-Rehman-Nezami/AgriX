import React, { useState, useEffect } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import API from '../utils/api';

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/admin/users');
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/admin/users/${userId}`);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: 3, background: 'linear-gradient(135deg, #ffffff 0%, #E0E7FF 100%)' }}>
      <CardContent sx={{ p: 4 }}>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">👥 User Management</h3>

        <TableContainer component={Paper} sx={{ maxHeight: 400, borderRadius: '12px' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#E0E7FF' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#E0E7FF' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#E0E7FF' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#E0E7FF' }}>Region</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#E0E7FF' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role.toUpperCase()} 
                      size="small"
                      color={user.role === 'admin' ? 'primary' : user.role === 'gov' ? 'secondary' : 'success'}
                    />
                  </TableCell>
                  <TableCell>{user.region || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="error" onClick={() => handleDelete(user._id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
