import React from 'react';
import { Box, Button } from '@mui/material';
import { images } from '../../../constants';
import { InputField, PasswordField } from '../../../form-control';
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';

const LoginForm = () => {
  return (
    <Box
      sx={{
        width: '35rem',
        border: '1px solid var(--border-gray)',
        padding: '1.8rem 1rem',
      }}
    >
      <Box
        component="img"
        src={images.LOGO}
        sx={{
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '25rem' }}>
          <InputField placeholder="Phone number, username, or email" />
          <PasswordField placeholder="Password" />
          <Box sx={{ marginBottom: '1.5rem' }}>
            <Button variant="contained" sx={{ width: '100%' }}>
              Login
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                backgroundColor: 'var(--border-gray)',
                width: '45%',
                height: '0.2rem',
                position: 'relative',
                top: '0.4rem',
              }}
            ></Box>
            <Box>OR</Box>
            <Box
              sx={{
                backgroundColor: 'var(--border-gray)',
                width: '45%',
                height: '0.2rem',
                position: 'relative',
                top: '0.4rem',
              }}
            ></Box>
          </Box>

          <Box>
            <Box
              component="button"
              sx={{
                display: 'block',
                width: '100%',
                border: 'none',
                padding: '2.3rem 0',
                backgroundColor: 'transparent',
              }}
            >
              <Box
                component="span"
                sx={{
                  '& svg': { marginRight: '0.5rem' },
                  color: '#385185',
                  cursor: 'pointer',
                }}
              >
                <FaFacebook />
                Login with facebook
              </Box>
            </Box>
            <Link
              to="/"
              style={{
                display: 'block',
                textAlign: 'center',
                fontSize: '1.5rem',
              }}
            >
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
