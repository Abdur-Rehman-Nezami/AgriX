import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid, Chip, Box } from '@mui/material';
import API from '../utils/api';

export default function CreatePostDialog({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    crop: '',
    region: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/forum/posts', form);
      alert('Post created successfully!');
      setForm({
        title: '',
        description: '',
        category: '',
        crop: '',
        region: '',
        tags: []
      });
      setTagInput('');
      onSuccess();
    } catch (error) {
      alert('Failed to create post');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setForm({ ...form, tags: form.tags.filter(tag => tag !== tagToDelete) });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Create New Post
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="What's your question or problem?"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                placeholder="Describe your problem in detail..."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <MenuItem value="pest-disease">Pest & Disease</MenuItem>
                <MenuItem value="soil-health">Soil Health</MenuItem>
                <MenuItem value="irrigation">Irrigation</MenuItem>
                <MenuItem value="fertilizer">Fertilizer</MenuItem>
                <MenuItem value="weather">Weather</MenuItem>
                <MenuItem value="equipment">Equipment</MenuItem>
                <MenuItem value="market">Market</MenuItem>
                <MenuItem value="general">General</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Crop (Optional)"
                value={form.crop}
                onChange={(e) => setForm({ ...form, crop: e.target.value })}
                placeholder="e.g., Wheat, Rice"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Region (Optional)"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                placeholder="e.g., Punjab, Sindh"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Add Tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Press Enter to add tags"
              />
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {form.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    sx={{ bgcolor: '#DBEAFE', color: '#1E40AF' }}
                  />
                ))}
              </Box>
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
              bgcolor: '#3B82F6', 
              '&:hover': { bgcolor: '#2563EB' },
              borderRadius: '12px',
              px: 4
            }}
          >
            Create Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
