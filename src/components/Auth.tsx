import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseInit';
import { Button, Container, Typography, Box } from '@mui/material';
import useAppStore from '../store';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useAppStore((state) => state.setUser);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser({
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
      });
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom>
          FoodTrack
        </Typography>
        <Typography variant="body1" gutterBottom>
          Manage your food and budget
        </Typography>
        <Button variant="contained" onClick={handleLogin} disabled={loading} sx={{ mt: 2 }}>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;