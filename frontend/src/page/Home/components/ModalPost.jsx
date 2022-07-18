import React from 'react';
import { List } from '@mui/material';
import { ModalChooseItem } from '../../../components';

const ModalPost = () => {
  return (
    <List
      sx={{
        width: '40rem',
        '& .css-19gbt1n-MuiListItem-root:last-child': { border: 'none' },
        p: 0,
      }}
    >
      <ModalChooseItem name="Report" active={true} />
      <ModalChooseItem name="Unfollow" active={true} />
      <ModalChooseItem name="Go to post" active={false} />
      <ModalChooseItem name="Cancal" active={false} />
    </List>
  );
};

export default ModalPost;
