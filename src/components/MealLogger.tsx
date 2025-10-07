import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import useAppStore from '../store';

const MealLogger: React.FC = () => {
  const { foodItems, addMealEntry } = useAppStore();
  const [selectedFoods, setSelectedFoods] = useState<{ foodId: string; quantity: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddFood = () => {
    if (selectedFood && quantity) {
      setSelectedFoods([...selectedFoods, { foodId: selectedFood, quantity: parseFloat(quantity) }]);
      setSelectedFood('');
      setQuantity('');
      setOpen(false);
    }
  };

  const handleRemoveFood = (index: number) => {
    setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    let totalCost = 0;
    let totalCalories = 0;
    selectedFoods.forEach(({ foodId, quantity }) => {
      const food = foodItems.find(f => f.id === foodId);
      if (food) {
        totalCost += food.pricePerUnit * quantity;
        totalCalories += food.caloriesPerUnit * quantity;
      }
    });
    return { totalCost, totalCalories };
  };

  const handleSaveMeal = () => {
    const { totalCost, totalCalories } = calculateTotals();
    addMealEntry({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      foodItems: selectedFoods,
      totalCost,
      totalCalories,
    });
    setSelectedFoods([]);
  };

  const { totalCost, totalCalories } = calculateTotals();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Log Meal
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Add Food
      </Button>
      <List>
        {selectedFoods.map((item, index) => {
          const food = foodItems.find(f => f.id === item.foodId);
          return (
            <ListItem key={index}>
              <ListItemText
                primary={`${food?.name} - ${item.quantity} ${food?.unit}`}
                secondary={`Cost: $${(food?.pricePerUnit || 0) * item.quantity}, Calories: ${(food?.caloriesPerUnit || 0) * item.quantity}`}
              />
              <IconButton onClick={() => handleRemoveFood(index)}>
                <Delete />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Typography variant="h6">Total Cost: ${totalCost.toFixed(2)}</Typography>
      <Typography variant="h6">Total Calories: {totalCalories}</Typography>
      <Button variant="contained" onClick={handleSaveMeal} disabled={selectedFoods.length === 0} sx={{ mt: 2 }}>
        Save Meal
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Food to Meal</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Food</InputLabel>
            <Select value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)}>
              {foodItems.map((food) => (
                <MenuItem key={food.id} value={food.id}>
                  {food.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddFood}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MealLogger;