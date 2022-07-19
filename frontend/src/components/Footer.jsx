import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Box, ListItem, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box>
      <List
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          paddingBottom: '2rem',
          '& .css-1p823my-MuiListItem-root': {
            fontSize: '1.3rem',
            padding: '0 1rem!important',
            width: 'inherit!important',
            '& a': { color: 'var(--color-8e8e8e)' },
          },
        }}
      >
        <ListItem>
          <Link to="/">About</Link>
        </ListItem>
        <ListItem>
          <Link to="/">Help</Link>
        </ListItem>

        <ListItem>
          <Link to="/">Press</Link>
        </ListItem>
        <ListItem>
          <Link to="/">Terms</Link>
        </ListItem>

        <ListItem>
          <Link to="/">Locations</Link>
        </ListItem>
      </List>
      <Typography variant="span" sx={{ p: '0 1rem', fontSize: '1.3rem' }}>
        © 2022 INSTAGRAM FROM sybuivan
      </Typography>
    </Box>
  );
};

Footer.propTypes = {};

export default Footer;
