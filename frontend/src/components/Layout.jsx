import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import { Header, Loading } from '.';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const isLoading = useSelector((state) => state.home.loading);
  console.log('isloading', isLoading);
  return (
    <div>
      <Header />
      <Box sx={{ mt: '9rem' }}>
        <Container
          maxWidth="false"
          sx={{ maxWidth: '97.5rem', height: '100%' }}
        >
          <Grid container spacing={2}>
            <Outlet />
          </Grid>
        </Container>
      </Box>
      {isLoading && <Loading loading={isLoading} />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Layout;
