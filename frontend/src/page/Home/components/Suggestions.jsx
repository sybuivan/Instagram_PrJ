import React, { useState } from 'react';
import { Box, List, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FriendItem } from '../../../components';
const Suggestions = ({
  onClickShowModal,
  suggestions,
  onClickFollow,
  onClickUnFollow,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: 'var(--color-8e8e8e)', fontWeight: '600' }}
        >
          Suggestions For You
        </Typography>
        <Link
          to="/"
          style={{
            color: 'var(--color-text)',
            fontSize: '1.3rem',
            fontWeight: '600',
          }}
        >
          See All
        </Link>
      </Box>
      <List>
        {suggestions.map((people) => (
          <FriendItem
            onClickFollow={onClickFollow}
            onClickUnFollow={onClickUnFollow}
            onClickShowModal={onClickShowModal}
            people={people}
            key={people.name}
          />
        ))}
      </List>
    </Box>
  );
};

Suggestions.propTypes = {};

export default Suggestions;
