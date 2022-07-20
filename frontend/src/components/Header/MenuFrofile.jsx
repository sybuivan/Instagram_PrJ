import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItemButton, ListItemIcon, Menu, Paper } from '@mui/material';
import { RiAccountCircleFill } from 'react-icons/ri';
import { BsBookmarkCheck } from 'react-icons/bs';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navDown: {
    zIndex: 2,
    '& .css-1ps6pg7-MuiPaper-root': {
      position: 'absolute',
      top: '3.2rem',
      right: 0,

      '& .MuiListItemButton-root': {
        fontSize: '1.6rem',
      },
    },
  },
});
const MenuFrofile = ({ openMenu }) => {
  const classes = useStyles();
  const handleClose = () => {};
  return (
    <Menu
      open={openMenu}
      onClose={handleClose}
      sx={{
        '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper':
          {
            width: '20rem',
            right: '29rem!important',
            top: '5rem!important',
            left: 'initial!important',
          },
        '& .MuiListItemButton-root': {
          fontSize: '1.6rem',
        },
      }}
    >
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
    </Menu>
  );
};

MenuFrofile.propTypes = {};

export default MenuFrofile;
