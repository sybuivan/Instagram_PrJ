import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const Inputfield = ({ placeholder, control, name, errors }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          id="outlined-basic"
          variant="outlined"
          placeholder={placeholder}
          sx={{
            width: '25rem',
            height: '3.6rem!important',
            marginBottom: !!errors[name] ? '2rem' : '1rem',
            fontSize: '1rem',
            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
              padding: '1rem 1.4rem',
            },
            '& .css-1wc848c-MuiFormHelperText-root': {
              fontSize: '1rem',
              marginLeft: 0,
            },
          }}
          helperText={errors[name]?.message}
          error={!!errors[name]}
        />
      )}
    />
  );
};

Inputfield.propTypes = {};

export default Inputfield;
