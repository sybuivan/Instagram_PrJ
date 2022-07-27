import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Box,
  ListItem,
  List,
  Typography,
  Button,
  ListItemText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FriendItem } from '.';

const useStyles = makeStyles({
  root: {
    width: '40rem',
    maxWidth: '40rem',
  },
  numberList: {
    display: 'flex!important',
    '& span': {
      display: 'block',
    },
  },
  listImage: {
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  boxButton: {
    display: 'flex',
    justifyContent: 'space-between',
    '& button': {
      flex: '4',
      margin: '1.5rem 1rem',
    },
  },
});
const FriendInfo = ({ info, user, posted }) => {
  console.log(posted);
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box sx={{ borderBottom: '1px solid #efefef' }}>
        <FriendItem
          people={{
            name: `${user.userName}`,
            byName: 'Follows you',
            isFollow: false,
            avatar: `${user.avatar}`,
          }}
        />
      </Box>
      <Box>
        <List className={classes.numberList}>
          <ListItem>
            <ListItemText
              sx={{
                textAlign: 'center',
                '& .css-83ijpv-MuiTypography-root': {
                  fontSize: '1.3rem',
                  color: 'var(--color-8e8e8e)',
                },
              }}
              primary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="h5"
                    variant="h5"
                    color="text.primary"
                  >
                    {posted?.length || 0}
                  </Typography>
                </React.Fragment>
              }
              secondary="post"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{
                textAlign: 'center',
                '& .css-83ijpv-MuiTypography-root': {
                  fontSize: '1.3rem',
                  color: 'var(--color-8e8e8e)',
                },
              }}
              primary={
                <React.Fragment>
                  <Typography
                    sx={{
                      display: 'inline',
                    }}
                    component="h5"
                    variant="h5"
                    color="text.primary"
                  >
                    {info?.followere?.length || 0}
                  </Typography>
                </React.Fragment>
              }
              secondary="followers"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{
                textAlign: 'center',
                '& .css-83ijpv-MuiTypography-root': {
                  fontSize: '1.3rem',
                  color: 'var(--color-8e8e8e)',
                },
              }}
              primary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="h5"
                    variant="h5"
                    color="text.primary"
                  >
                    {info?.following?.length || 0}
                  </Typography>
                </React.Fragment>
              }
              secondary="following"
            />
          </ListItem>
        </List>

        <Box>
          <List className={`${classes.numberList} ${classes.listImage}`}>
            {posted.map((item) => (
              <ListItem sx={{ p: '0 0.1rem', height: '12rem', width: '13rem' }}>
                <Box
                  component="img"
                  src={`${process.env.REACT_APP_BASE_URL}/${item.images}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box className={classes.boxButton}>
          <Button variant="outlined">Message</Button>
          <Button variant="outlined">Following</Button>
        </Box>
      </Box>
    </Paper>
  );
};

FriendInfo.propTypes = {};

export default FriendInfo;
