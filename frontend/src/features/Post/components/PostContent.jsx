import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { AiOutlineSmile } from 'react-icons/ai';
import { images } from '../../../constants';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const PostContent = ({ thumbs, onChangeCaption, caption }) => {
  const { register } = useForm();
  const inforUser = useSelector((state) => state.home.inforUser);
  const [showEmoji, setShowEmoji] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    // setComment((pre) => pre + emojiObject.emoji);
  };
  return (
    <>
      <Grid item xs={7}>
        {thumbs}
      </Grid>
      <Grid item xs={5} sx={{ overflowY: 'scroll' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={`${process.env.REACT_APP_BASE_URL}${inforUser.avatar}`}
            />
          </ListItemAvatar>
          <Typography variant="h5" sx={{ fontWeight: '600' }}>
            {inforUser.userName}
          </Typography>
        </ListItem>
        <TextField
          sx={{
            width: '100%',

            '& textarea': {
              color: 'var(--color-8e8e8e)',
              fontSize: '1.4rem',
            },
            '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
          name="caption"
          {...register('caption')}
          onChange={(e) => {
            onChangeCaption(e.target.value);
          }}
          rows="10"
          placeholder="Write a caption"
          multiline
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              '& aside.emoji-picker-react': {
                position: 'absolute',
                top: '3.3rem',
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
          <Typography variant="span" sx={{ pr: 1, fontSize: '1.3rem' }}>
            {caption.length}/2000
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

PostContent.propTypes = {};

export default PostContent;
