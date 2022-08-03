import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Paper,
} from '@mui/material';
import { AiFillProfile } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';

const data = [
  { icon: <AiFillProfile />, label: 'Edit profile', to: '' },
  {
    icon: <RiLockPasswordFill />,
    label: 'Change password',
    to: 'change-password',
  },
];

function SideBarEdit(props) {
  const navigate = useNavigate();
  return (
    <Paper sx={{ p: 2 }}>
      {data.map((item) => (
        <ListItemButton
          key={item.label}
          sx={{ py: 0, minHeight: 32 }}
          onClick={() => navigate(`/edit-profile/${item.to}`)}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
          />
        </ListItemButton>
      ))}
    </Paper>
  );
}

SideBarEdit.propTypes = {};

export default SideBarEdit;
