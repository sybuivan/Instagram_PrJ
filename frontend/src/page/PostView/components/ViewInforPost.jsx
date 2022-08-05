import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Picker from 'emoji-picker-react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineSmile } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ListComments } from '.';
import { commentsApi } from '../../../api';
import { FriendInfo } from '../../../components';
import { BasicModal, ModalChooseItem } from '../../../components';
import ModalPost from '../../Home/components/ModalPost';
import { hiddenModal, showModal } from '../../Home/homeSlice';

const useStyles = makeStyles({
  name: {
    '& .css-10hburv-MuiTypography-root': {
      fontSize: '1.4rem',
      color: 'var(--color-text)',
      fontWeight: '600',
    },
    '& .css-83ijpv-MuiTypography-root': {
      fontSize: '1.2rem',
      color: 'var(--color-text)',
    },
  },
  listItem: {
    display: 'inline-block!important',
    width: 'inherit!important',
    paddingRight: '0!important',
    paddingLeft: '0!important',
    '& svg': {
      fontSize: '2.5rem',
      fontWeight: '600',
    },
  },
  infoItem: {
    borderBottom: '1px solid var(--border-gray)',
  },
  avatar: {
    cursor: 'pointer',
    position: 'relative',

    '&:hover ': {
      '& > $boxFriendInfo': {
        display: 'block',
        zIndex: 2,
      },
    },
  },
  padding: {
    position: 'absolute',
    content: 'h',
    width: '10rem',
    backgroundColor: 'transparent',
    height: '2rem',
    top: '3.5rem',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  boxFriendInfo: {
    position: 'absolute',
    top: '5rem',
    display: 'none',
  },
});
function ViewInforPost({
  postById,
  listPosted,
  onPostComments,
  onShowMoreModalComment,
  onDeleteComment,
  onEditComment,
}) {
  const isShowModal = useSelector((state) => state.home.modal);
  const dispatch = useDispatch();

  const { posted, comments } = postById;
  const navigate = useNavigate();
  const classes = useStyles();
  const [showEmoji, setShowEmoji] = useState(false);
  const [idComment, setIdComment] = useState();
  console.log(onDeleteComment);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const handleOnClickHideModal = () => {
    dispatch(hiddenModal('COMMENT'));
  };

  const handleOnShowOption = (idComment) => {
    dispatch(showModal('COMMENT'));
    setIdComment(idComment);
  };
  //   show icon
  const onEmojiClick = (event, emojiObject) => {
    // setComment((pre) => pre + emojiObject.emoji);
  };

  const handleOnComment = async (data) => {
    await onPostComments(data);
    reset({});
  };
  const handleOnViewComment = async () => {
    try {
      const res = await commentsApi.getCommentById(idComment);
      reset({ comment: res.comment });
      dispatch(hiddenModal('COMMENT'));
    } catch (error) {}
  };
  const handleOnEditComment = async (data) => {
    await onEditComment(idComment, data.comment);
    reset({ comment: '' });
  };
  return (
    <Box sx={{ height: '100%' }}>
      <ListItem alignItems="flex-start" className={classes.infoItem}>
        <ListItemAvatar
          className={classes.avatar}
          onClick={() => navigate(`/${posted.user.userName}`)}
        >
          <Avatar
            alt="Remy Sharp"
            src={`${process.env.REACT_APP_BASE_URL}${posted.user.avatar}`}
          />
          <Box className={classes.boxFriendInfo}>
            <FriendInfo user={posted.user} posted={listPosted} />
          </Box>

          <Box className={classes.padding} />
        </ListItemAvatar>
        <ListItemText
          className={classes.name}
          primary={posted.user.userName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                ebe_banhbao•Original Audios
              </Typography>
            </React.Fragment>
          }
        />
        <IconButton>
          <FiMoreHorizontal />
        </IconButton>
      </ListItem>
      <ListComments
        comments={comments}
        onShowModalOption={handleOnShowOption}
      />
      <form
        onSubmit={handleSubmit(
          !idComment ? handleOnComment : handleOnEditComment
        )}
      >
        <Box sx={{ p: '2rem 0', borderTop: '0.1rem solid #efefef' }}>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                flex: 1,
                position: 'relative',
                '& aside.emoji-picker-react': {
                  position: 'absolute',
                  bottom: '5.2rem',
                },
              }}
            >
              <IconButton
                sx={{
                  '& svg': {
                    fontSize: '2.5rem',
                  },
                }}
                onClick={() => setShowEmoji((pre) => !pre)}
              >
                <AiOutlineSmile />
              </IconButton>
              {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
            </Box>
            <Box sx={{ flex: 10 }}>
              <Controller
                control={control}
                name="comment"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <OutlinedInput
                    onChange={onChange}
                    value={value}
                    placeholder="Add a comment..."
                    sx={{ width: '92%', fontSize: '1.3rem' }}
                  />
                )}
              />
            </Box>
            <Button
              sx={{ flex: 1, mr: 1 }}
              variant="text"
              // disabled={!comment}
              type="submit"
            >
              Post
            </Button>
          </Box>
        </Box>
      </form>
      {isShowModal.COMMENT && (
        <BasicModal
          component={
            <ModalPost>
              <ModalChooseItem
                name="Delete comment"
                active={true}
                onDeleteComment={() => onDeleteComment(idComment)}
              />
              <ModalChooseItem
                name="Edit comment"
                active={true}
                onEditComment={handleOnViewComment}
              />
              <ModalChooseItem name="Cancel" active={true} />
            </ModalPost>
          }
          type="MORE_POST"
          showModal={true}
          onClickHideModal={handleOnClickHideModal}
        />
      )}
    </Box>
  );
}

ViewInforPost.propTypes = {};

export default ViewInforPost;
