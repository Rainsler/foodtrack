import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import useAppStore from '../store';

const History: React.FC = () => {
  const mealEntries = useAppStore((state) => state.mealEntries);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meal History
      </Typography>
      <List>
        {mealEntries.map((entry) => (
          <div key={entry.id}>
            <ListItem>
              <ListItemText
                primary={`Date: ${entry.date}`}
                secondary={`Total Cost: $${entry.totalCost.toFixed(2)}, Total Calories: ${entry.totalCalories}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default History;