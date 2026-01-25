import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

export default function PriceTable({ prices }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: 3 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#D1FAE5' }}>
          <TableRow>
            <TableCell><strong>Crop</strong></TableCell>
            <TableCell><strong>Price (PKR)</strong></TableCell>
            <TableCell><strong>Region</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Source</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((price) => (
            <TableRow key={price._id} hover>
              <TableCell>{price.crop}</TableCell>
              <TableCell>{price.price} / {price.unit}</TableCell>
              <TableCell>{price.region}</TableCell>
              <TableCell>{new Date(price.date).toLocaleDateString()}</TableCell>
              <TableCell><Chip label={price.source} size="small" color={price.source === 'admin' ? 'primary' : 'default'} /></TableCell>
              <TableCell>{price.verified ? '✅ Verified' : '⏳ Pending'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
