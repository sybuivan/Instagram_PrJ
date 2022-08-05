import { List } from '@mui/material';
import React from 'react';
import { Comment } from '.';

function ListComments({
  comments,
  onDeleteComment,
  onEditComment,
  onShowModalOption,
}) {
  return (
    <>
      <List sx={{ overflowY: 'scroll', height: '72%' }}>
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comments={comment}
            onShowModalOption={onShowModalOption}
          />
        ))}
      </List>
    </>
  );
}

ListComments.propTypes = {};

export default ListComments;
