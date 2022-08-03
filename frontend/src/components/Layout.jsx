import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import { Header, Loading } from '.';
import { useSelector } from 'react-redux';

const Layout = () => {
  const isLoading = useSelector((state) => state.home.loading);
  console.log('isloading', isLoading);
  return (
    <div>
      <Header />
      <Box sx={{ mt: '9rem' }}>
        <Container
          maxWidth="false"
          sx={{ maxWidth: '82.5rem', height: '100%' }}
        >
          <Grid container spacing={2}>
            <Outlet />
          </Grid>
        </Container>
      </Box>
      {isLoading && <Loading loading={isLoading} />}
    </div>
  );
};

export default Layout;
