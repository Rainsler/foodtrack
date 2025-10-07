import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseInit';
import useAppStore from '../store';

const Header: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4caf50' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FoodTrack
        </Typography>
        {user && (
          <Box>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/foods">
              Foods
            </Button>
            <Button color="inherit" component={Link} to="/log-meal">
              Log Meal
            </Button>
            <Button color="inherit" component={Link} to="/history">
              History
            </Button>
            <Button color="inherit" component={Link} to="/weight">
              Weight
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;