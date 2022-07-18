import React from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { images } from '../../../constants';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  item: {
    display: 'inherit!important',
    width: '6.6rem!important',
    marginRight: '1.4rem',
  },
  avatar: {
    width: '6.6rem',
    height: '6.6rem',
    borderRadius: '100%',
    marginBottom: '1rem',
  },
  name: {
    fontSize: '1.3rem',
    display: 'block',
  },
});
const ListFriends = () => {
  const classes = useStyles();
  return (
    <Paper sx={{ mb: 2 }}>
      <List sx={{ display: 'flex' }}>
        <ListItem className={classes.item}>
          <ListItemAvatar sx={{ width: '100%' }}>
            <Box
              component="img"
              alt="Remy Sharp"
              src={images.USER_FK}
              className={classes.avatar}
            />
            <Typography variant="span" align="center" className={classes.name}>
              linhchi2k904
            </Typography>
          </ListItemAvatar>
        </ListItem>
        <ListItem className={classes.item}>
          <ListItemAvatar sx={{ width: '100%' }}>
            <Box
              component="img"
              alt="Remy Sharp"
              src={images.USER_FK}
              className={classes.avatar}
            />
            <Typography variant="span" align="center" className={classes.name}>
              linhchi2k904
            </Typography>
          </ListItemAvatar>
        </ListItem>
      </List>
    </Paper>
  );
};

ListFriends.propTypes = {};

export default ListFriends;
