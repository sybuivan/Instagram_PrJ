import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@mui/material';
import { ContentMessage, SideBar } from './components';
import { Outlet } from 'react-router';

const Message = () => {
  return (
    <Paper
      sx={{
        width: '100%',
        maxHeight: '60rem',
        height: '60rem',
        border: '1px solid #ccc',
      }}
    >
      <Grid container sx={{ width: '100%', height: '100%' }}>
        <Grid item xs={4}>
          <SideBar />
        </Grid>
        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Paper>
  );
};

Message.propTypes = {};

export default Message;
