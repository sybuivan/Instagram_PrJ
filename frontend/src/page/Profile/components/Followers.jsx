import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  List,
  Button,
} from '@mui/material';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { images } from '../../../constants';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '40rem',
    width: '40rem',
    height: '30rem',
    overflowY: 'hidden',
  },
  boxHead: {
    position: 'relative',
    padding: '1.5rem 0',
    borderBottom: '1px solid var(--border-gray)',
    '& h4': {
      textAlign: 'center',
    },
  },
  iconClose: {
    position: 'absolute!important',
    top: '1rem',
    right: '0.5rem',
    fontSize: '2rem!important',
  },
});
function People() {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={images.USER_FK} />
      </ListItemAvatar>
      <ListItemText
        primary="he"
        secondary={
          <React.Fragment>
            <Typography
              sx={{
                display: 'inline',
                fontSize: '1.2rem',
                color: 'var(--color-8e8e8e)',
              }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              hahah
            </Typography>
          </React.Fragment>
        }
      />
      <Button
        sx={{
          border: '1px solid var(--border-gray)',
          color: 'var(--color-text)',
        }}
      >
        Follow
      </Button>
    </ListItem>
  );
}

function Followers({ onClose }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box className={classes.boxHead}>
        <Typography variant="h4">Followers</Typography>
        <IconButton className={classes.iconClose} onClick={() => onClose()}>
          <AiOutlineCloseCircle />
        </IconButton>
      </Box>
      <Box sx={{ height: '100%' }}>
        <List sx={{ overflowY: 'scroll', height: '100%' }}>
          <People />
          <People />
          <People />
          <People />
          <People />
          <People />
        </List>
      </Box>
    </Paper>
  );
}

Followers.propTypes = {};

export default Followers;
