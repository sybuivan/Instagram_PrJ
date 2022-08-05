import { Grid, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { commentsApi } from '../../api';
import { useGetPostDetail, usePostComment } from '../../hooks';
import { postComment } from '../../utils';
import { hiddenModal } from '../Home/homeSlice';
import { ViewImages, ViewInforPost } from '../PostView/components';

function ViewDetailPost(props) {
  const { idPost } = useParams();
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const handleOnPostComments = async (data) => {
    await postComment(idPost, data.comment);
    setIsComment((pre) => !pre);
  };
  const handleOnDeleteComment = async (idComment) => {
    await commentsApi.deleteComment(idComment);
    setIsComment((pre) => !pre);
    dispatch(hiddenModal('COMMENT'));
  };
  useEffect(() => {
    dispatch(hiddenModal('MORE_POST'));
  }, []);
  const { postById, listPosted, loading } = useGetPostDetail(idPost, isComment);

  return (
    <>
      {!loading && (
        <Box
          sx={{
            width: '120rem',
            height: '62rem',
            overflow: 'hidden',
            maxWidth: '120rem',
            backgroundColor: 'var(--color-white)',
          }}
        >
          <Grid container sx={{ width: '100%', height: '100%' }}>
            <Grid item xs={6} sx={{ height: '100%' }}>
              <ViewImages images={postById.posted.images} />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ height: '100%', backgroundColor: 'var(--color-white)' }}
            >
              <ViewInforPost
                postById={postById}
                listPosted={listPosted}
                onPostComments={handleOnPostComments}
                onDeleteComment={handleOnDeleteComment}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

ViewDetailPost.propTypes = {};

export default ViewDetailPost;
