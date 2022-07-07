import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const Inputfield = ({ placeholder }) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      placeholder={placeholder}
      sx={{
        width: '25rem',
        height: '3.6rem!important',
        marginBottom: '1rem',
        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
          padding: '1rem 1.4rem',
        },
      }}
    />
  );
};

Inputfield.propTypes = {};

export default Inputfield;
