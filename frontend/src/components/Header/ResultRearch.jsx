import React from 'react';
import PropTypes from 'prop-types';
import { List, Paper, Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import FriendRearch from './FriendRearch';
const useStyles = makeStyles({
  listResult: {
    position: 'absolute!important',
    right: '2.2rem',
    zIndex: 2,
  },
  paper: {
    width: '30rem',
  },
  content: {
    '& span': {
      fontSize: '1.4rem',
    },
  },
});
const ResultRearch = ({ listResult, focused }) => {
  const classes = useStyles();
  if (focused)
    return (
      <List className={classes.listResult}>
        <Paper className={classes.paper}>
          <Typography variant="h5" sx={{ p: 1, fontWeight: 600 }}>
            Recent
          </Typography>
          <Box className={classes.content}>
            {listResult.length > 0 ? (
              <>
                {listResult.map((item) => (
                  <FriendRearch key={item.userName} people={item} />
                ))}
              </>
            ) : (
              <Typography
                variant="span"
                align="center"
                sx={{ display: 'block', padding: '5rem 0' }}
              >
                No recent searches.
              </Typography>
            )}
          </Box>
        </Paper>
      </List>
    );
};

ResultRearch.propTypes = {};

export default ResultRearch;
