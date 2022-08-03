import { List } from '@mui/material';
import React from 'react';
import { Comment } from '.';

function ListComments({ comments }) {
  return (
    <>
      <List sx={{ overflowY: 'scroll', height: '72%' }}>
        {comments.map((comment) => (
          <Comment key={comment._id} comments={comment} />
        ))}
      </List>
    </>
  );
}

ListComments.propTypes = {};

export default ListComments;
