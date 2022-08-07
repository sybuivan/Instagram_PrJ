import { Box, Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { commentsApi, postApi } from '../../api';
import { BasicModal } from '../../components';
import { getUserId, getUserName, postComment } from '../../utils';
import { useGetPostDetail } from '../../hooks';

import {
  fetchPostFriends,
  hiddenLoading,
  hiddenModal,
  setLoading,
  showModal,
} from '../Home/homeSlice';
import { ViewImages, ViewInforPost } from './components';

function PostView(props) {
  const { idPost } = useParams();
  const dispatch = useDispatch();
  const isShowModal = useSelector((state) => state.home.modal);
  const navigate = useNavigate();
  const [isComment, setIsComment] = useState(false);

  useEffect(() => {
    dispatch(showModal('VIEW_POST'));
    dispatch(hiddenModal('MORE_POST'));
  }, []);

  const handleOnPostComments = async (data) => {
    await postComment(idPost, data.comment);
    setIsComment((pre) => !pre);
    dispatch(fetchPostFriends(getUserName()));
  };

  const handleOnDeleteComment = async (idComment) => {
    await commentsApi.deleteComment(idComment);
    dispatch(hiddenModal('COMMENT'));
    setIsComment((pre) => !pre);
    dispatch(fetchPostFriends(getUserName()));
  };

  const handleOnEditComment = async (idComment, comment) => {
    await commentsApi.editComment({
      _id: idComment,
      comment: comment,
    });
    setIsComment((pre) => !pre);
  };

  const handleOnClickHideModal = () => {
    dispatch(hiddenModal('VIEW_POST'));
    navigate(-1);
  };
  const { postById, listPosted, loading } = useGetPostDetail(idPost, isComment);
  return (
    <div>
      {!loading && (
        <BasicModal
          component={
            <Box
              sx={{
                // width: '120rem',
                height: '62rem',
                overflowX: 'hidden',
                overflowY: 'scroll',
                maxWidth: '120rem',
                backgroundColor: 'var(--color-white)',
              }}
            >
              <Grid container sx={{ width: '100%', height: '100%' }}>
                <Grid container sx={{ width: '100%', height: '100%' }}>
                  <Grid item lg={6} md={6} sm={12} sx={{ height: '100%' }}>
                    <ViewImages images={postById.posted.images} />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} sx={{ height: '100%' }}>
                    <ViewInforPost
                      postById={postById}
                      listPosted={listPosted}
                      onPostComments={handleOnPostComments}
                      onDeleteComment={handleOnDeleteComment}
                      onEditComment={handleOnEditComment}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          }
          type="MORE_POST"
          showModal={isShowModal.VIEW_POST}
          onClickHideModal={handleOnClickHideModal}
        />
      )}
    </div>
  );
}

PostView.propTypes = {};

export default PostView;
