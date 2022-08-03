import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { AiOutlineComment } from 'react-icons/ai';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '25rem',
    position: 'relative',
    cursor: 'pointer',
    '&:hover $boxIcon, &:hover $overlay': {
      opacity: 1,
    },
  },
  boxImages: {
    width: '100%',
    height: '100%',
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0,
    transition: 'all 0.3s',
  },
  boxIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'var(--color-white)',
    fontSize: '2rem',
    display: 'flex',
    zIndex: 1,
    opacity: 0,
    transition: 'all 0.3s',
    fontWeight: '600',
    '& span': {
      marginLeft: '1rem',
    },
  },
});
function Post({ post }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { posted, totalComments } = post;
  return (
    <Box
      className={classes.root}
      onClick={() => navigate(`/view/${posted._id}`)}
    >
      <Box className={classes.boxImages}>
        <Box
          component="img"
          src={`${process.env.REACT_APP_BASE_URL}/${posted.images}`}
        />
      </Box>
      <Box className={classes.boxIcon}>
        <AiOutlineComment />
        <Typography variant="span">{totalComments}</Typography>
      </Box>
      <Box className={classes.overlay}></Box>
    </Box>
  );
}

Post.propTypes = {};

export default Post;
