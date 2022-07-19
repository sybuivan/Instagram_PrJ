import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@mui/material';

const ModalChooseItem = ({ name, active, onAcceptUnFollow }) => {
  const handleChooseItem = () => {
    if (!!onAcceptUnFollow) {
      console.log('hihi', !!onAcceptUnFollow);
      onAcceptUnFollow();
    }
  };
  return (
    <ListItem
      sx={{
        justifyContent: 'center',
        borderBottom: '0.1rem solid #efefef',
        fontSize: '1.4rem',
        padding: '1.5rem 0',
        color: active ? '#ed4956' : '#262626',
        fontWeight: active ? '600' : '300',
        cursor: 'pointer',
      }}
      onClick={handleChooseItem}
    >
      {name}
    </ListItem>
  );
};

ModalChooseItem.propTypes = {};

export default ModalChooseItem;
