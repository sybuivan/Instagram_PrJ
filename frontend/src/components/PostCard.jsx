import React, { useState } from 'react';
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
import { images } from '../constants';
import { makeStyles } from '@mui/styles';
import FriendInfo from './FriendInfo';

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
const PostCard = ({ onClickShowMore }) => {
  const classes = useStyles();
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState('');

  //   show icon
  const onEmojiClick = (event, emojiObject) => {
    setComment((pre) => pre + emojiObject.emoji);
  };

  //   change comments post
  const handleOnChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleOnClickMore = () => {
    if (!onClickShowMore) return;
    onClickShowMore('MORE_POST');
  };

  return (
    <Box className={classes.root}>
      <Paper>
        <Box>
          <ListItem alignItems="flex-start" className={classes.infoItem}>
            <ListItemAvatar className={classes.avatar}>
              <Avatar alt="Remy Sharp" src={images.USER_FK} />
              <Box className={classes.boxFriendInfo}>
                <FriendInfo />
              </Box>
              <Box className={classes.padding} />
            </ListItemAvatar>
            <ListItemText
              className={classes.name}
              primary="linhchi2k904"
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
            src={images.POST_IMG}
            sx={{ width: '100%', height: '50rem' }}
          />
        </Box>
        <Box>
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid item xs={11}>
              <List sx={{ display: 'flex' }}>
                <ListItem className={classes.listItem}>
                  <IconButton>
                    <AiOutlineHeart />
                  </IconButton>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <IconButton>
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
          <Box sx={{ mb: 1 }}>40 likes</Box>
          <Box sx={{ color: 'var(--color-8e8e8e)' }}>View all 3 comments</Box>
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
                placeholder="Add a comment..."
                sx={{ width: '92%', fontSize: '1.3rem' }}
                onChange={handleOnChangeComment}
              />
            </Box>
            <Button
              sx={{ flex: 1, mr: 1 }}
              variant="text"
              type="submit"
              disabled={!comment}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

PostCard.propTypes = {};

export default PostCard;
