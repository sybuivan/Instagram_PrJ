import { ListItemButton, ListItemIcon, Menu } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { BsBookmarkCheck } from 'react-icons/bs';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { RiAccountCircleFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const MenuFrofile = ({ openMenu, onClickLogout }) => {
  const userName = useSelector((state) => state.auth.current);
  console.log(userName);
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
      <ListItemButton
        sx={{ borderTop: '0.1rem solid var(--border-gray)' }}
        onClick={() => onClickLogout()}
      >
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
