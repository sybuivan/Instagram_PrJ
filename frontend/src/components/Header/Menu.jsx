import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItemButton, ListItemIcon, Paper } from '@mui/material';
import { RiAccountCircleFill } from 'react-icons/ri';
import { BsBookmarkCheck } from 'react-icons/bs';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navDown: {
    '& .css-1ps6pg7-MuiPaper-root': {
      position: 'absolute',
      top: '3.2rem',
      right: 0,
      width: '20rem',
      '& .MuiListItemButton-root': {
        fontSize: '1.6rem',
      },
    },
  },
});
const Menu = ({ openMenu }) => {
  const classes = useStyles();
  return (
    <List className={openMenu ? classes.navDown : ''}>
      <Paper>
        <ListItemButton>
          <ListItemIcon>
            <RiAccountCircleFill />
          </ListItemIcon>
          Profile
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BsBookmarkCheck />
          </ListItemIcon>
          Saved
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FiSettings />
          </ListItemIcon>
          Settings
        </ListItemButton>
        <ListItemButton sx={{ borderTop: '0.1rem solid var(--border-gray)' }}>
          <ListItemIcon>
            <FiLogOut fontSize="small" />
          </ListItemIcon>
          Logout
        </ListItemButton>
      </Paper>
    </List>
  );
};

Menu.propTypes = {};

export default Menu;
