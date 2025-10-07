import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import useAppStore from '../store';

const Profile: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const calculateBMR = useAppStore((state) => state.calculateBMR);

  const [form, setForm] = useState({
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    gender: user?.gender || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        age: parseInt(form.age),
        height: parseInt(form.height),
        weight: parseInt(form.weight),
        gender: form.gender as 'male' | 'female' | 'other',
      };
      updatedUser.bmr = calculateBMR(updatedUser);
      setUser(updatedUser);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            type="number"
            value={form.height}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            type="number"
            value={form.weight}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>BMR: {user?.bmr || 0} calories/day</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;