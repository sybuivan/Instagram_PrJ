import React, { useMemo } from 'react';
import { Box } from '@mui/material';

function ViewImages({ images }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'fill',
        },
      }}
    >
      <Box component="img" src={`${process.env.REACT_APP_BASE_URL}${images}`} />
    </Box>
  );
}

ViewImages.propTypes = {};

export default ViewImages;
