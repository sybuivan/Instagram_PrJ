import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactComponent as PicSvg } from '../assets/images/picVideo.svg';
const useStyles = makeStyles({
  root: {
    width: '45rem',
    height: '50rem',
  },
  postHead: {
    borderBottom: '1px solid #efefef',
    padding: '2rem 0',
  },
  wrapperPic: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10rem 0',
  },
  boxPic: {
    '& svg': {
      margin: 'auto',
      width: '100%',
    },
    '& h5': {
      padding: '2rem 0',
      fontSize: '2.2rem',
    },
  },
});
const CreateNewPost = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.postHead}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Create new post
        </Typography>
      </Box>
      <Box className={classes.wrapperPic}>
        <Box className={classes.boxPic}>
          <PicSvg />
          <Typography variant="h5">Drag photos and videos here</Typography>
        </Box>

        <Box>
          <Button variant="contained">Select from computer</Button>
        </Box>
      </Box>
    </Box>
  );
};

CreateNewPost.propTypes = {};

export default CreateNewPost;
