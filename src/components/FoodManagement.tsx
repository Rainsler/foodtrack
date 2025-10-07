import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Delete, Edit, Favorite, FavoriteBorder } from '@mui/icons-material';
import useAppStore from '../store';

const FoodManagement: React.FC = () => {
  const { foodItems, addFoodItem, updateFoodItem, deleteFoodItem } = useAppStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    unit: '',
    pricePerUnit: '',
    caloriesPerUnit: '',
  });

  const handleOpen = (item?: any) => {
    if (item) {
      setEditing(item.id);
      setForm({
        name: item.name,
        unit: item.unit,
        pricePerUnit: item.pricePerUnit.toString(),
        caloriesPerUnit: item.caloriesPerUnit.toString(),
      });
    } else {
      setEditing(null);
      setForm({ name: '', unit: '', pricePerUnit: '', caloriesPerUnit: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleSave = () => {
    const item = {
      id: editing || Date.now().toString(),
      name: form.name,
      unit: form.unit,
      pricePerUnit: parseFloat(form.pricePerUnit),
      caloriesPerUnit: parseFloat(form.caloriesPerUnit),
      isFavorite: false,
    };
    if (editing) {
      updateFoodItem(editing, item);
    } else {
      addFoodItem(item);
    }
    handleClose();
  };

  const toggleFavorite = (id: string) => {
    const item = foodItems.find(f => f.id === id);
    if (item) {
      updateFoodItem(id, { isFavorite: !item.isFavorite });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Food Management
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add Food Item
      </Button>
      <Grid container spacing={2}>
        {foodItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Unit: {item.unit}</Typography>
                <Typography>Price: ${item.pricePerUnit.toFixed(2)} per {item.unit}</Typography>
                <Typography>Calories: {item.caloriesPerUnit} per {item.unit}</Typography>
                <IconButton onClick={() => toggleFavorite(item.id)}>
                  {item.isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <IconButton onClick={() => handleOpen(item)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteFoodItem(item.id)}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Food Item' : 'Add Food Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Unit"
            fullWidth
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price per Unit"
            type="number"
            fullWidth
            value={form.pricePerUnit}
            onChange={(e) => setForm({ ...form, pricePerUnit: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Calories per Unit"
            type="number"
            fullWidth
            value={form.caloriesPerUnit}
            onChange={(e) => setForm({ ...form, caloriesPerUnit: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FoodManagement;