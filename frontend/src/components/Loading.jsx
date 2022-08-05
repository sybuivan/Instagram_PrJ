import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Box } from '@mui/material';

function Loading({ loading }) {
  return (
    <>
      {loading && (
        <Box
          sx={{
            width: '100%',
            height: '2rem',
            position: 'fixed',
            top: '6rem',
            right: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <LinearProgress />
        </Box>
      )}
    </>
  );
}

Loading.propTypes = {};

export default Loading;
