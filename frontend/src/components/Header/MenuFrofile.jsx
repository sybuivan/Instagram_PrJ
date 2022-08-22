import { ListItemButton, ListItemIcon, Menu } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AccountCircle, BookmarkCheck, Logout, Settings } from '../Icons';

const MenuFrofile = ({ openMenu, onClickLogout }) => {
  const userName = useSelector((state) => state.auth.current);
  const navigate = useNavigate();
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
      <ListItemButton onClick={() => navigate(`${userName}`)}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Profile
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BookmarkCheck />
        </ListItemIcon>
        Saved
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        Settings
      </ListItemButton>
      <ListItemButton
        sx={{ borderTop: '0.1rem solid var(--border-gray)' }}
        onClick={() => onClickLogout()}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </ListItemButton>
    </Menu>
  );
};

MenuFrofile.propTypes = {};

export default MenuFrofile;
