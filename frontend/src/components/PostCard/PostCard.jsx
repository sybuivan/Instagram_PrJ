import React, { useEffect, useMemo, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import {
  Box,
  Paper,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  List,
  OutlinedInput,
  Button,
} from '@mui/material';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineSmile,
} from 'react-icons/ai';
import { BsShare, BsBookmarkCheck } from 'react-icons/bs';
import { images } from '../../constants';
import { makeStyles } from '@mui/styles';
import { BasicModal, FriendInfo } from '..';
import { commentsApi, postApi, likesApi } from '../../api';
import { useNavigate } from 'react-router';
import { getUserId, getUserName } from '../../utils';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Follow from '../../page/Profile/components/Follow';
import { hiddenModal, showModal } from '../../page/Home/homeSlice';
import { getInforPost } from '../../page/PostView/postSlice';

const useStyles = makeStyles({
  root: {
    marginBottom: '2rem',
  },
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
  infoItem: {},
  avatar: {
    cursor: 'pointer',
    position: 'relative',

    '&:hover ': {
      '& > $boxFriendInfo': {
        display: 'block',
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
const PostCard = ({ post, onPostComments }) => {
  const { comments, posted, totalComments, totalLikes } = post;
  const isShowModal = useSelector((state) => state.home.modal);
  const dispatch = useDispatch();

  const refIcon = useRef(null);
  const classes = useStyles();
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState('');
  const [listPosted, setListPosted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingListUser, setLoadingListUser] = useState(false);
  const [isHeart, setIsHeart] = useState(false);
  const [listUser, setListUser] = useState([]);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      comment: '',
    },
  });
  //   show icon
  const onEmojiClick = (event, emojiObject) => {
    setComment((pre) => pre + emojiObject.emoji);
  };

  //   change comments post
  const handleOnChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleOnClickMore = () => {
    dispatch(
      getInforPost({
        idPost: posted._id,
        userName: posted.user.userName,
        userLogin: getUserName()
      })
    );
    dispatch(showModal('MORE_POST'));
  };

  useEffect(() => {
    (async () => {
      const { newList, follows } = await postApi.getPostAll(
        posted.user.userName
      );
      setListPosted({ newList, follows });
      getIsHeartPost();
      setLoading(true);
    })();
  }, []);

  const getIsHeartPost = async () => {
    const res = await likesApi.checkIsHeartPost({
      userId: getUserId(),
      postId: posted._id,
    });
    setIsHeart(res?.isHeart);
  };

  const handleOnComments = async (data) => {
    onPostComments({ user_id: getUserId(), post_id: posted._id, comment });
    setComment('');
  };
  const totalRef = useRef();
  const FriendInfoMemo = useMemo(
    () => <FriendInfo user={posted.user} posted={listPosted} />,
    [listPosted]
  );
  const navigate = useNavigate();
  const handleClickHeart = async () => {
    try {
      const resHeart = await likesApi.createHeart({
        user_id: getUserId(),
        post_id: posted._id,
      });
      getIsHeartPost();

      if (resHeart) {
        totalRef.current.innerText = Number(totalRef.current.innerText) + 1;
      }
    } catch (error) {}
  };
  const handleClickUnHeart = async () => {
    try {
      await likesApi.unLikePost({
        userId: getUserId(),
        postId: posted._id,
      });
      getIsHeartPost();
      totalRef.current.innerText = Number(totalRef.current.innerText) - 1;
    } catch (error) {}
  };

  const handleGetListUser = async () => {
    try {
      const res = await likesApi.getUserLikes(posted._id);
      dispatch(showModal('LIKES'));
      setListUser(res.listUser);
      setLoadingListUser(true);
    } catch (error) {}
  };
  const handleOnCloseModal = () => {
    dispatch(hiddenModal('LIKES'));
  };
  return (
    <form onSubmit={handleSubmit(handleOnComments)}>
      <Box className={classes.root}>
        {loading && (
          <Paper>
            <Box>
              <ListItem alignItems="flex-start" className={classes.infoItem}>
                <ListItemAvatar className={classes.avatar}>
                  <Avatar
                    alt="Remy Sharp"
                    src={`${process.env.REACT_APP_BASE_URL}${posted.user.avatar}`}
                    onClick={() => navigate(`${posted.user.userName}`)}
                  />
                  <Box className={classes.boxFriendInfo}>{FriendInfoMemo}</Box>
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
                <IconButton onClick={handleOnClickMore}>
                  <FiMoreHorizontal />
                </IconButton>
              </ListItem>
            </Box>
            <Box>
              <Box
                component="img"
                src={`${process.env.REACT_APP_BASE_URL}${posted.images}`}
                sx={{ width: '100%', height: '50rem', objectFit: 'cover' }}
              />
            </Box>
            <Box>
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item xs={11}>
                  <List sx={{ display: 'flex' }}>
                    <ListItem className={classes.listItem}>
                      {isHeart ? (
                        <IconButton
                          ref={refIcon}
                          onClick={handleClickUnHeart}
                          sx={{ '& svg': { color: 'red' } }}
                        >
                          <AiOutlineHeart />
                        </IconButton>
                      ) : (
                        <IconButton onClick={handleClickHeart}>
                          <AiOutlineHeart />
                        </IconButton>
                      )}
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <IconButton
                        onClick={() => navigate(`/view/${posted._id}`)}
                      >
                        <AiOutlineComment />
                      </IconButton>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <IconButton>
                        <BsShare />
                      </IconButton>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={1}>
                  <ListItem className={classes.listItem}>
                    <IconButton>
                      <BsBookmarkCheck />
                    </IconButton>
                  </ListItem>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ pl: 2, fontSize: '1.4rem', fontWeight: '600', mb: 3 }}>
              <Box sx={{ mb: 1 }}>
                {posted.user.userName}
                <Typography variant="span" sx={{ fontWeight: '400' }}>
                  {posted.caption}
                </Typography>
              </Box>
              <Box
                sx={{ mb: 1, cursor: 'pointer' }}
                onClick={handleGetListUser}
              >
                <Typography
                  variant="span"
                  sx={{ fontWeight: '600', mr: 0.3 }}
                  ref={totalRef}
                >
                  {totalLikes}
                </Typography>
                likes
              </Box>
              <Box
                sx={{ color: 'var(--color-8e8e8e)', cursor: 'pointer' }}
                onClick={() => navigate(`/view-h/${posted._id}`)}
              >
                View all {totalComments} comments
              </Box>
            </Box>
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
                  <OutlinedInput
                    value={comment}
                    name="commnets"
                    placeholder="Add a comment..."
                    sx={{ width: '92%', fontSize: '1.3rem' }}
                    onChange={handleOnChangeComment}
                  />
                </Box>
                <Button
                  sx={{ flex: 1, mr: 1 }}
                  variant="text"
                  disabled={!comment}
                  type="submit"
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
      {loadingListUser && (
        <BasicModal
          component={
            <Follow
              listUser={listUser}
              title="LIKES"
              onClose={handleOnCloseModal}
            />
          }
          type="LIKES"
          showModal={isShowModal.LIKES}
          onClickHideModal={handleOnCloseModal}
        />
      )}
    </form>
  );
};

PostCard.propTypes = {};

export default PostCard;
