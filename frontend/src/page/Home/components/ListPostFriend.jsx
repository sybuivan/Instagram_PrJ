import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from '../../../components';

const ListPostFriend = ({ onClickShowMore }) => {
  return (
    <div>
      <PostCard onClickShowMore={onClickShowMore} />
      <PostCard onClickShowMore={onClickShowMore} />
      <PostCard onClickShowMore={onClickShowMore} />
    </div>
  );
};

ListPostFriend.propTypes = {};

export default ListPostFriend;
