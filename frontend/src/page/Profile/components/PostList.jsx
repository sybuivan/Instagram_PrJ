import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import { images } from '../../../constants';
import { Post } from '.';

function PostList({ listPost }) {
  console.log('listPost', listPost);
  if (listPost.length > 0) {
    return (
      <>
        {listPost.map((post) => (
          <Grid item lg={4} md={4} key={post._id} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </>
    );
  }
  return (
    <>
      <Grid item xs={5}>
        <Box
          component="img"
          alt="Remy Sharp"
          src={images.NO_POST}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={7} sx={{ '& h3, & span': { fontSize: '2rem' } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ pb: 2, fontWeight: '600' }}>
              Start capturing and sharing your moments.
            </Typography>
            <Typography
              variant="span"
              sx={{ display: 'block', textAlign: 'center' }}
            >
              Get the app to share your first photo or video.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                '& img': {
                  width: '12rem',
                },
              }}
            >
              <Box
                component="img"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
              />
              <Box
                component="img"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

PostList.propTypes = {};

export default PostList;
