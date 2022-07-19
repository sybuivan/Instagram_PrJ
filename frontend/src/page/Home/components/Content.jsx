import React, { useSate, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from '@mui/material';
import ListFriends from './ListFriends';
import ListPostFriend from './ListPostFriend';
import ModalPost from './ModalPost';
import { Footer, Modal, ModalChooseItem } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { hiddenModal, showModal } from '../homeSlice';
import Suggestions from './Suggestions';

const Content = () => {
  const [suggestions, setSuggestions] = useState(() => [
    {
      name: 'daudkavyinza',
      byName: 'Follows you',
      isFollow: false,
    },
    {
      name: 'thuongdang3101',
      byName: 'Followed by mingxin_ssy',
      isFollow: true,
    },
    {
      name: 'quyen.7899',
      byName: 'Followed by mingxin_ssy',
      isFollow: false,
    },
    {
      name: 'daudkavyinza233',
      byName: 'Follows you',
      isFollow: false,
    },
  ]);
  const dispatch = useDispatch();
  const isShowModal = useSelector((state) => state.home.showModal);
  const [user, setUser] = useState(null);
  const handleOnClickShowMore = () => {
    dispatch(showModal());
  };
  const handleOnClickHideModal = () => {
    dispatch(hiddenModal());
  };
  const handleOnClickFollow = (name) => {
    const newSuggestions = [...suggestions];
    const peopleIndex = suggestions.findIndex((people) => people.name === name);
    if (peopleIndex >= 0) {
      newSuggestions[peopleIndex].isFollow = true;
      console.log(newSuggestions[peopleIndex]);
      setSuggestions(newSuggestions);
    }
  };
  const handleOnClickUnFollow = (name) => {
    setUser({
      name: name,
    });
  };
  const handleOnAcceptUnFollow = () => {
    const newSuggestions = [...suggestions];
    const peopleIndex = suggestions.findIndex(
      (people) => people.name === user?.name
    );
    if (peopleIndex >= 0) {
      newSuggestions[peopleIndex].isFollow = false;
      console.log(newSuggestions[peopleIndex]);
      setSuggestions(newSuggestions);
    }
    dispatch(hiddenModal());
  };
  return (
    <Container maxWidth="false" sx={{ maxWidth: '82.5rem', height: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <ListFriends />
          <ListPostFriend onClickShowMore={handleOnClickShowMore} />
        </Grid>
        <Grid item xs={5}>
          <Suggestions
            onClickShowModal={handleOnClickShowMore}
            suggestions={suggestions}
            onClickFollow={handleOnClickFollow}
            onClickUnFollow={handleOnClickUnFollow}
          />

          {/* Footer */}
          <Footer />
        </Grid>
      </Grid>
      {!!user && (
        <Modal
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
          showModal={isShowModal}
          onClickHideModal={handleOnClickHideModal}
        />
      )}
      {/* (
      <Modal
        component={
          <ModalPost>
            <ModalChooseItem name="Report" active={true} />
            <ModalChooseItem name="Unfollow" active={true} />
            <ModalChooseItem name="Go to post" active={false} />
            <ModalChooseItem name="Cancal" active={false} />
          </ModalPost>
        }
        showModal={isShowModal}
        onClickHideModal={handleOnClickHideModal}
      />
      ) */}
    </Container>
  );
};

Content.propTypes = {};

export default Content;
