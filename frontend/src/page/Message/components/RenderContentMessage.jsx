import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  TextField,
  InputBase,
} from '@mui/material';
import {
  OutlineHeart,
  OutlinePhone,
  OutlinePicture,
  OutlineVideoCamera,
} from '../../../components/Icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export const ContentSend = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{}}>
          Your Messages
        </Typography>
        <Typography
          variant="span"
          sx={{
            color: 'var(--color-8e8e8e)',
            p: 1,
            display: 'block',
            fontSize: '1.4rem',
          }}
        >
          Send private photos and messages to a friend or group.
        </Typography>
        <Button variant="contained" sx={{ display: 'block', margin: 'auto' }}>
          Send message
        </Button>
      </Box>
    </Box>
  );
};

export const ContentMessageUser = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-gray)',
          padding: '0 1rem',
          height: ' 6rem',
        }}
      >
        <Box>
          <Avatar
            alt="Remy Sharp"
            src="http://localhost:5000/v1/1659004142736272911605_966139784010639_5137371691398520701_n.jpg"
            sx={{ width: '4rem', height: '4rem', mr: 2 }}
          />
        </Box>
        <Box sx={{ '& svg': { fontSize: '2.4rem' } }}>
          <IconButton>
            <OutlinePhone />
          </IconButton>
          <IconButton>
            <OutlineVideoCamera />
          </IconButton>
          <IconButton>
            <AiOutlineInfoCircle />
          </IconButton>
        </Box>
      </Box>

      {/* Content messages */}
      <Box sx={{ height: 'calc(100% - 10.2rem - 8%)' }}></Box>

      <Box
        sx={{
          height: '8%',
          borderRadius: '4rem',
          width: '90%',
          margin: 'auto',
          border: '1px solid var(--border-gray)',
          padding: '0.5rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: '1.3rem', width: '80%' }}
          placeholder="Message"
        />
        <Box sx={{ '& svg': { fontSize: '2.4rem' } }}>
          <IconButton>
            <OutlinePicture />
          </IconButton>
          <IconButton>
            <OutlineHeart />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
