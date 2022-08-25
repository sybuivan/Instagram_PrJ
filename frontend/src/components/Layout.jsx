import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
import { Header, Loading } from '.';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const isLoading = useSelector((state) => state.home.loading);
  const matches = useMediaQuery(
    json2mq({
      maxWidth: 900,
    })
  );
  return (
    <div>
      <Header />
      <Box sx={{ mt: '9rem' }}>
        <Container
          maxWidth="false"
          sx={{ maxWidth: '97.5rem', height: '100%' }}
        >
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: matches && 'center' }}
          >
            <Outlet />
          </Grid>
        </Container>
      </Box>
      {isLoading && <Loading loading={isLoading} />}
    </div>
  );
};

export default Layout;
