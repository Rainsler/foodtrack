import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useAppStore from '../store';

const Dashboard: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const mealEntries = useAppStore((state) => state.mealEntries);
  const weightEntries = useAppStore((state) => state.weightEntries);

  // Calculate weekly totals
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  const weeklyMeals = mealEntries.filter((entry) => new Date(entry.date) >= thisWeek);
  const totalCost = weeklyMeals.reduce((sum, meal) => sum + meal.totalCost, 0);
  const totalCalories = weeklyMeals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  const avgDaily = totalCalories / 7;

  const latestWeight = weightEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.weight || 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Weekly Summary</Typography>
              <Typography>Total Cost: ${totalCost.toFixed(2)}</Typography>
              <Typography>Total Calories: {totalCalories}</Typography>
              <Typography>Avg Daily Calories: {avgDaily.toFixed(0)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Current Weight</Typography>
              <Typography>{latestWeight} kg</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button component={Link} to="/foods" variant="contained" sx={{ mr: 2 }}>
            Manage Foods
          </Button>
          <Button component={Link} to="/history" variant="contained" sx={{ mr: 2 }}>
            View History
          </Button>
          <Button component={Link} to="/weight" variant="contained" sx={{ mr: 2 }}>
            Track Weight
          </Button>
          <Button component={Link} to="/profile" variant="contained">
            Edit Profile
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;