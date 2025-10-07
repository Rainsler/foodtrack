import React, { useState, useEffect } from 'react';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseInit';
import { Button, Container, Typography, Box } from '@mui/material';
import useAppStore from '../store';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          setUser({
            uid: user.uid,
            name: user.displayName || '',
            email: user.email || '',
          });
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('Redirect sign-in failed:', error);
      }
    };
    handleRedirect();
  }, [setUser]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
    }
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
          {loading ? 'Redirecting...' : 'Sign in with Google'}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;