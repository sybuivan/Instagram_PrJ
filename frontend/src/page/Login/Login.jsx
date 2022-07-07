import React from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from './components/LoginForm';
const Login = () => {
  return (
    <Box sx={{ padding: '3rem 0' }}>
      <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"
        />
        <Box>
          <LoginForm />
        </Box>
      </Container>
    </Box>
  );
};

Login.propTypes = {};

export default Login;
