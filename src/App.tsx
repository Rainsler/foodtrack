import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import FoodManagement from './components/FoodManagement';
import History from './components/History';
import WeightTracking from './components/WeightTracking';
import Auth from './components/Auth';
import MealLogger from './components/MealLogger';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, pt: 2, pb: 2 }}>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/foods" element={<FoodManagement />} />
              <Route path="/history" element={<History />} />
              <Route path="/weight" element={<WeightTracking />} />
              <Route path="/log-meal" element={<MealLogger />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
