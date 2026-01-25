import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid } from '@mui/material';
import API from '../utils/api';

export default function AddRegionDialog({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    regionName: '',
    area: '',
    areaUnit: 'acres',
    crop: '',
    plantingDate: '',
    soilType: '',
    soilPH: '',
    currentStage: 'preparation',
    healthStatus: 'good'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/farm/regions', form);
      alert('Region added successfully!');
      setForm({
        regionName: '',
        area: '',
        areaUnit: 'acres',
        crop: '',
        plantingDate: '',
        soilType: '',
        soilPH: '',
        currentStage: 'preparation',
        healthStatus: 'good'
      });
      onSuccess();
    } catch (error) {
      alert('Failed to add region');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Add New Farm Region
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Region Name"
                value={form.regionName}
                onChange={(e) => setForm({ ...form, regionName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Crop"
                value={form.crop}
                onChange={(e) => setForm({ ...form, crop: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Area"
                type="number"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Area Unit"
                value={form.areaUnit}
                onChange={(e) => setForm({ ...form, areaUnit: e.target.value })}
              >
                <MenuItem value="acres">Acres</MenuItem>
                <MenuItem value="hectares">Hectares</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Planting Date"
                type="date"
                value={form.plantingDate}
                onChange={(e) => setForm({ ...form, plantingDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Current Stage"
                value={form.currentStage}
                onChange={(e) => setForm({ ...form, currentStage: e.target.value })}
              >
                <MenuItem value="preparation">Preparation</MenuItem>
                <MenuItem value="planting">Planting</MenuItem>
                <MenuItem value="growing">Growing</MenuItem>
                <MenuItem value="flowering">Flowering</MenuItem>
                <MenuItem value="harvesting">Harvesting</MenuItem>
                <MenuItem value="fallow">Fallow</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soil Type"
                value={form.soilType}
                onChange={(e) => setForm({ ...form, soilType: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soil pH"
                type="number"
                step="0.1"
                value={form.soilPH}
                onChange={(e) => setForm({ ...form, soilPH: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Health Status"
                value={form.healthStatus}
                onChange={(e) => setForm({ ...form, healthStatus: e.target.value })}
              >
                <MenuItem value="excellent">Excellent</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="fair">Fair</MenuItem>
                <MenuItem value="poor">Poor</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} sx={{ borderRadius: '12px' }}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{ 
              bgcolor: '#10B981', 
              '&:hover': { bgcolor: '#059669' },
              borderRadius: '12px',
              px: 4
            }}
          >
            Add Region
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
