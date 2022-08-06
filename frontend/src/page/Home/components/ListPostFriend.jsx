import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from '../../../components';
import { useSelector } from 'react-redux';

const ListPostFriend = ({ onClickShowMore, onPostComments }) => {
  const listPost = useSelector((state) => state.home.ListPostFriend);
  return (
    <div>
      {listPost.map((post) => (
        <PostCard post={post} key={post._id} onPostComments={onPostComments} />
      ))}
    </div>
  );
};

ListPostFriend.propTypes = {};

export default ListPostFriend;
