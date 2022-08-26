import React, { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { OutlineSmile } from '../../../components/Icons';
import { PicSvg } from '../../../constants/images';

const useStyles = makeStyles({
  wrapperHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& svg, & button': {
      fontSize: '1.5rem',
    },
  },
  wrapperPic: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10rem 0',
  },
  boxPic: {
    '& svg': {
      margin: 'auto',
      width: '100%',
    },
    '& h5': {
      padding: '2rem 0',
      fontSize: '2.2rem',
    },
  },
});
export const PostContent = ({ thumbs, onChangeCaption, caption, isEdit }) => {
  const { register, reset, setValue } = useForm();
  const inforUser = useSelector((state) => state.home.inforUser);
  const [showEmoji, setShowEmoji] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    // setComment((pre) => pre + emojiObject.emoji);
  };
  useEffect(() => {
    (() => {
      setValue('caption', caption);
    })();
  }, [caption]);
  return (
    <>
      <Grid item xs={7}>
        {isEdit ? (
          <Box>
            <Box
              component="img"
              src={`${process.env.REACT_APP_BASE_URL}${thumbs}`}
              className="previewImage"
            />
          </Box>
        ) : (
          thumbs
        )}
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
              <OutlineSmile />
            </IconButton>
            {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
          </Box>
          <Typography variant="span" sx={{ pr: 1, fontSize: '1.3rem' }}>
            {caption?.length}/2000
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export const PostSelect = ({ files }) => {
  const classes = useStyles();
  return (
    <div>
      {!files && (
        <Box className={classes.wrapperPic}>
          <Box className={classes.boxPic}>
            {/* <PicSvg /> */}
            <Typography variant="h5">Drag photos and videos here</Typography>
          </Box>

          <Box>
            <Button variant="contained">Select from computer</Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export const PostHeadShared = ({ shareSucc }) => {
  const classes = useStyles();
  return (
    <>
      {shareSucc && (
        <Box className={classes.wrapperHead} sx={{ justifyContent: 'center' }}>
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', fontWeight: '600' }}
          >
            Post shared
          </Typography>
        </Box>
      )}
    </>
  );
};

export const PostBodyShared = ({ shareSucc }) => {
  const classes = useStyles();
  return (
    <>
      {shareSucc && (
        <Box className={classes.wrapperPic}>
          <Box className={classes.boxPic}>
            <Box
              component="img"
              src="https://static.cdninstagram.com/rsrc.php/v3/yb/r/sHkePOqEDPz.gif"
              sx={{
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
            <Typography variant="h5">Your post has been shared</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
