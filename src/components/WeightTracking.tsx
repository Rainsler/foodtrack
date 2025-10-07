import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAppStore from '../store';

const WeightTracking: React.FC = () => {
  const { weightEntries, addWeightEntry } = useAppStore();
  const [weight, setWeight] = useState('');

  const handleAdd = () => {
    if (weight) {
      addWeightEntry({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(weight),
      });
      setWeight('');
    }
  };

  const chartData = weightEntries.map((entry) => ({
    date: entry.date,
    weight: entry.weight,
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weight Tracking
      </Typography>
      <TextField
        label="Weight (kg)"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={handleAdd}>
        Add Entry
      </Button>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Weight History
      </Typography>
      <List>
        {weightEntries.map((entry) => (
          <div key={entry.id}>
            <ListItem>
              <ListItemText primary={`${entry.date}: ${entry.weight} kg`} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Weight Chart
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default WeightTracking;