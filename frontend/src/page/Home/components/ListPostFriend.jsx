import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from '../../../components';

const ListPostFriend = ({ onClickShowMore, listPost }) => {
  return (
    <div>
      {listPost.map((post) => (
        <PostCard
          onClickShowMore={onClickShowMore}
          post={post}
          key={post._id}
        />
      ))}
    </div>
  );
};

ListPostFriend.propTypes = {};

export default ListPostFriend;
