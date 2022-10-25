import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, List, ListItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MessageCard = ({ info }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '1rem',
        marginTop: '0.4rem',
        userSelect: 'none',
      }}
      onClick={() => navigate(`${info.id}`)}
    >
      <Avatar
        alt="Remy Sharp"
        src={`http://localhost:5000/v1/${info.avatar}`}
        sx={{ width: '7rem', height: '7rem', mr: 2 }}
      />
      <Box>
        <Typography variant="h5" sx={{ fontWeight: '600', pb: 1 }}>
          {info.fullName}
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
  const friends = useSelector((state) => state.home.listUserFriends);

  console.log(friends);
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
        {friends[0]?.following.map((info) => (
          <ListItem sx={{ p: 0, display: 'inherit' }} key={info.id}>
            <MessageCard info={info} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
