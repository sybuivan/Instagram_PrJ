import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, List, ListItem, Typography } from '@mui/material';

export const MessageCard = ({ infor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        background: '#efefef',
        padding: '1rem',
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="http://localhost:5000/v1/1659004142736272911605_966139784010639_5137371691398520701_n.jpg"
        sx={{ width: '7rem', height: '7rem', mr: 2 }}
      />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: '600', pb: 1 }}>
          nguyenvana
        </Typography>
        <Typography variant="h5" sx={{}}>
          Hello em
          <Typography
            variant="span"
            sx={{ color: 'var(--color-8e8e8e)', p: '0 1rem' }}
          >
            -
          </Typography>
          <Typography variant="span" sx={{ color: 'var(--color-8e8e8e)' }}>
            1 hours
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};
export const SideBar = (props) => {
  return (
    <Box sx={{ borderRight: '1px solid var(--border-gray)', height: '100%' }}>
      <Box
        sx={{
          borderBottom: '1px solid var(--border-gray)',
          fontSize: '1.5rem',
          fontWeight: '600',
          height: ' 6rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        buivansy
      </Box>

      <List>
        <ListItem sx={{ p: 0, display: 'inherit' }}>
          <MessageCard />
        </ListItem>
      </List>
    </Box>
  );
};
