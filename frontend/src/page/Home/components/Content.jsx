import React, { useSate } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from '@mui/material';
import ListFriends from './ListFriends';
import ListPostFriend from './ListPostFriend';
import ModalPost from './ModalPost';
import { Modal } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { hiddenModal, showModal } from '../homeSlice';

const Content = () => {
  const dispatch = useDispatch();
  const isShowModal = useSelector((state) => state.home.showModal);
  console.log('isShowModal', isShowModal);
  const handleOnClickShowMore = () => {
    dispatch(showModal());
  };
  const handleOnClickHideModal = () => {
    dispatch(hiddenModal());
  };
  return (
    <Container maxWidth="false" sx={{ maxWidth: '82.5rem', height: '100%' }}>
      <Grid container>
        <Grid item xs={7}>
          <ListFriends />
          <ListPostFriend onClickShowMore={handleOnClickShowMore} />
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
      <Modal
        component={<ModalPost />}
        showModal={isShowModal}
        onClickHideModal={handleOnClickHideModal}
      />
    </Container>
  );
};

Content.propTypes = {};

export default Content;
