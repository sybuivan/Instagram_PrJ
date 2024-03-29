import React from 'react';
import { ListItem } from '@mui/material';
import { useNavigate } from 'react-router';

const ModalChooseItem = ({
  name,
  active,
  onAcceptUnFollow,
  onDiscard,
  postId,
  onDeleteComment,
  idComment,
  onEditComment,
  onDelete,
  onEdit,
  onClickHideModal,
  onAcceptDelete,
}) => {
  const navigate = useNavigate();
  const handleChooseItem = () => {
    if (!!onAcceptUnFollow) {
      onAcceptUnFollow();
    }
    if (!!onDiscard) {
      onDiscard();
    }
    if (!!postId) {
      navigate(`/view-post-detail/${postId}`);
    }
    if (!!onDeleteComment) {
      onDeleteComment();
    }
    if (!!onEditComment) {
      onEditComment();
    }
    if (!!onDelete) {
      onDelete();
    }
    if (!!onClickHideModal) {
      onClickHideModal('MODAL_DELETE');
    }
    if (!!onAcceptDelete) {
      onAcceptDelete();
    }
    if (!!onEdit) {
      onEdit();
    }
  };
  return (
    <ListItem
      sx={{
        justifyContent: 'center',
        borderBottom: '0.1rem solid #efefef',
        fontSize: '1.4rem',
        padding: '1.5rem 0',
        color: active ? '#ed4956' : '#262626',
        fontWeight: active ? '600' : '300',
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, .1)',
        },
      }}
      onClick={handleChooseItem}
    >
      {name}
    </ListItem>
  );
};

export default ModalChooseItem;
