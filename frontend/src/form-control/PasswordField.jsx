import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const Passwordfield = ({ placeholder }) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      placeholder={placeholder}
      type="password"
      sx={{
        width: '25rem',
        marginBottom: '1.5rem',
        height: '3.6rem!important',
        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
          padding: '1rem 1.4rem',
        },
      }}
    />
  );
};

Passwordfield.propTypes = {};

export default Passwordfield;
