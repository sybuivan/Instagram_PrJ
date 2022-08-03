import { Box, Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { commentsApi, postApi } from '../../api';
import { BasicModal } from '../../components';
import { getUserId } from '../../utils';
import {
  hiddenLoading,
  hiddenModal,
  setLoading,
  showModal,
} from '../Home/homeSlice';
import { ViewImages, ViewInforPost } from './components';

function PostView(props) {
  const { idPost } = useParams();
  const dispatch = useDispatch();
  const [postById, setPostById] = useState([]);
  const [listPosted, setListPosted] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const isShowModal = useSelector((state) => state.home.modal);
  const navigate = useNavigate();
  const getPostById = async (idPost) => {
    try {
      console.log(idPost);

      dispatch(setLoading());
      const { posted, comments } = await postApi.getPostById(idPost);
      const { newList, follows } = await postApi.getPostAll(
        posted.user.userName
      );
      setListPosted({ newList, follows });

      setPostById({ posted, comments });
    } catch (error) {
    } finally {
      dispatch(hiddenLoading());
      setShowLoading(true);
    }
  };
  useEffect(() => {
    getPostById(idPost);
    dispatch(showModal('VIEW_POST'));
  }, []);

  const handleOnPostComments = async (data) => {
    console.log(data);
    try {
      const comment = await commentsApi.createComment({
        post_id: idPost,
        user_id: getUserId(),
        comment: data.comment,
      });
      getPostById(idPost);
    } catch (error) {}
  };

  const handleOnClickHideModal = () => {
    dispatch(hiddenModal('VIEW_POST'));
    navigate(-1);
  };

  return (
    <div>
      {showLoading && (
        <BasicModal
          component={
            <Box
              sx={{
                width: '120rem',
                height: '62rem',
                overflow: 'hidden',
                maxWidth: '120rem',
              }}
            >
              <Grid container sx={{ width: '100%', height: '100%' }}>
                <Grid item xs={6} sx={{ height: '100%' }}>
                  <ViewImages images={postById.posted.images} />
                </Grid>
                <Grid item xs={6} sx={{ height: '100%' }}>
                  <ViewInforPost
                    postById={postById}
                    listPosted={listPosted}
                    onPostComments={handleOnPostComments}
                  />
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
