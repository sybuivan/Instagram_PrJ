import React, { useMemo, useSate, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from '@mui/material';
import ListFriends from './ListFriends';
import ListPostFriend from './ListPostFriend';
import ModalPost from './ModalPost';
import { BasicModal, Footer, ModalChooseItem } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { hiddenModal, showModal } from '../homeSlice';
import Suggestions from './Suggestions';

const Content = ({
  listPost,
  friends,
  listUserSuggets,
  onClickFollow,
  onClickUnFollow,
  userFollow,
  onPostComments,
}) => {
  const isShowModal = useSelector((state) => state.home.modal);
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
  const [idPostClick, setIdPostClick] = useState('');
  const [user, setUser] = useState(null);
  const handleOnClickShowMore = (typeModal, idPost) => {
    if (typeModal === 'MORE_POST') {
      dispatch(showModal('MORE_POST'));
    } else {
      dispatch(showModal('UNFOLLOW'));
    }
    setIdPostClick(idPost);
  };
  const handleOnClickHideModal = (typeModal) => {
    if (typeModal === 'MORE_POST') {
      dispatch(hiddenModal('MORE_POST'));
    } else {
      dispatch(hiddenModal('UNFOLLOW'));
    }
  };
  // const handleOnClickFollow = (id) => {
  //   onClickFollow(id);
  //   const newSuggestions = [...listUserSuggets];
  //   const peopleIndex = newSuggestions.findIndex((people) => people.id === id);
  //   if (peopleIndex >= 0) {
  //     newSuggestions[peopleIndex].isFollow = true;
  //     console.log(newSuggestions[peopleIndex]);
  //     setSuggestions(newSuggestions);
  //   }
  // };
  // const handleOnClickUnFollow = (name) => {
  //   setUser({
  //     name: name,
  //   });
  // };
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
        listUserSuggets={listUserSuggets}
      />
    ),
    [listUserSuggets, userFollow]
  );
  return (
    <>
      <Grid item xs={7}>
        <ListFriends friends={friends} />
        <ListPostFriend
          onClickShowMore={handleOnClickShowMore}
          listPost={listPost}
          onPostComments={onPostComments}
        />
      </Grid>
      <Grid item xs={5}>
        {suggestionsMemo}
        {!!user && memoizedCard}
        {/* Footer */}
        <Footer />
      </Grid>
      <BasicModal
        component={
          <ModalPost>
            <ModalChooseItem name="Unfollow" active={true} />
            <ModalChooseItem
              name="Go to post"
              active={false}
              postId={idPostClick}
            />
            <ModalChooseItem name="Cancal" active={false} />
          </ModalPost>
        }
        type="MORE_POST"
        showModal={isShowModal.MORE_POST}
        onClickHideModal={handleOnClickHideModal}
      />
    </>
  );
};

Content.propTypes = {};

export default Content;
