import React from 'react';
import { List } from '@mui/material';
import { ModalChooseItem } from '../../../components';

const ModalPost = ({ children }) => {
  return (
    <List
      sx={{
        width: '40rem',
        '& .css-19gbt1n-MuiListItem-root:last-child': { border: 'none' },
        p: 0,
      }}
    >
      {children}
    </List>
  );
};

export default ModalPost;
