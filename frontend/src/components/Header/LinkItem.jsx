import React from 'react';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
  navIcon: {
    position: 'relative',
    '& > svg': {
      fontSize: '2.5rem',
    },
  },
});
const LinkItem = ({ path, icon, onShowModal }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const handleOnClick = () => {
    console.log('hahah', path);
    if (!!path) {
      navigate(`${path}`);
    } else {
      onShowModal();
    }
  };
  return (
    <IconButton
      size="large"
      aria-label="show 4 new mails"
      color="inherit"
      className={classes.navIcon}
      onClick={handleOnClick}
    >
      {icon}
    </IconButton>
  );
};

export default LinkItem;
