import { Grid, Box, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BasicModal, Footer, ModalChooseItem } from '../../../components';
import { getUserName, toastify } from '../../../utils';
import { deletePostById } from '../../PostView/postSlice';
import { fetchPostFriends, hiddenModal, showModal } from '../homeSlice';
import ListFriends from './ListFriends';
import ListPostFriend from './ListPostFriend';
import ModalPost from './ModalPost';
import Suggestions from './Suggestions';

const Content = ({
  onClickFollow,
  onClickUnFollow,
  userFollow,
  onPostComments,
}) => {
  const isShowModal = useSelector((state) => state.home.modal);
  
  const { idPost, isPostMe } = useSelector((state) => state.post.inforPost);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const handleOnClickShowMore = (typeModal) => {
    if (typeModal === 'MORE_POST') {
      dispatch(showModal('MORE_POST'));
    } else {
      dispatch(showModal('UNFOLLOW'));
    }
  };

  // show modal accept delete
  const handleShowModalDelete = () => {
    dispatch(hiddenModal('MORE_POST'));
    dispatch(showModal('MODAL_DELETE'));
  };
  const handleOnClickHideModal = (typeModal) => {
    dispatch(hiddenModal(typeModal));
  };
 
  const handleOnAcceptUnFollow = () => {
    dispatch(hiddenModal());
  };

  // handle delete post
  const handleOnAcceptDelete = () => {
    try {
      dispatch(deletePostById(idPost));
      dispatch(hiddenModal('MODAL_DELETE'));
      dispatch(fetchPostFriends(getUserName()));
      toastify('success', 'Delete posted successfully');
    } catch (error) {}
  };
  const memoizedCard = useMemo(() => {
    return (
      <BasicModal
        component={
          <ModalPost>
            <ModalChooseItem
              name="Unfollow"
              active={true}
              onAcceptUnFollow={handleOnAcceptUnFollow}
            />
            <ModalChooseItem name="Cancal" active={false} />
          </ModalPost>
        }
        type="UNFOLLOW"
        showModal={isShowModal.UNFOLLOW}
        onClickHideModal={handleOnClickHideModal}
      />
    );
  }, [isShowModal]);

  const suggestionsMemo = useMemo(
    () => (
      <Suggestions
        onClickShowModal={handleOnClickShowMore}
        onClickFollow={onClickFollow}
        onClickUnFollow={onClickUnFollow}
      />
    ),
    [userFollow]
  );
  return (
    <>
      <Grid item md={7}>
        <ListFriends />
        <ListPostFriend onPostComments={onPostComments} />
      </Grid>
      <Grid item md={5}>
        {suggestionsMemo}
        {!!user && memoizedCard}
        {/* Footer */}
        <Footer />
      </Grid>
      <BasicModal
        component={
          <ModalPost>
            <>
              {!isPostMe && <ModalChooseItem name="Unfollow" active={true} />}
              {isPostMe && (
                <>
                  <ModalChooseItem
                    name="Delete post"
                    active={true}
                    onDelete={handleShowModalDelete}
                  />
                  <ModalChooseItem name="Edit post" active={false} />
                </>
              )}
              <ModalChooseItem
                name="Go to post"
                active={false}
                postId={idPost}
              />
            </>
            <ModalChooseItem
              name="Cancal"
              active={false}
              onClickHideModal={handleOnClickHideModal}
            />
          </ModalPost>
        }
        type="MORE_POST"
        showModal={isShowModal.MORE_POST}
        onClickHideModal={handleOnClickHideModal}
      />
      <BasicModal
        component={
          <ModalPost>
            <Box
              sx={{
                p: '2rem 0',
                textAlign: 'center',
                borderBottom: '0.1rem solid #efefef',
              }}
            >
              <Typography variant="h4" sx={{ pb: 2, fontWeight: '600' }}>
                Delete post?
              </Typography>
              <Typography variant="span" sx={{ fontSize: '1.5rem' }}>
                Are you sure you want to delete this post?
              </Typography>
            </Box>
            <ModalChooseItem
              name="Delete"
              active={true}
              onAcceptDelete={handleOnAcceptDelete}
            />
            <ModalChooseItem
              name="Cancal"
              active={false}
              onClickHideModal={handleOnClickHideModal}
            />
          </ModalPost>
        }
        type="MODAL_DELETE"
        showModal={isShowModal.MODAL_DELETE}
        onClickHideModal={handleOnClickHideModal}
      />
    </>
  );
};

Content.propTypes = {};

export default Content;
