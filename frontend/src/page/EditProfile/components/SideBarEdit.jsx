import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FillProfile, LockPasswordFill } from '../../../components/Icons';
const data = [
  { icon: <FillProfile />, label: 'Edit profile', to: '/edit-profile/' },
  {
    icon: <LockPasswordFill />,
    label: 'Change password',
    to: '/edit-profile/change-password',
  },
];

function SideBarEdit(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Paper sx={{ p: 2 }}>
      {data.map((item) => (
        <ListItemButton
          key={item.label}
          sx={{
            py: 0,
            minHeight: 32,
            '& svg': {
              fontSize: '2.3rem',
            },
            borderLeft:
              pathname === item.to
                ? '1px solid rgba(0,0,0,1)'
                : '1px solid transparent',
          }}
          onClick={() => navigate(`${item.to}`)}
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
