import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  TextField,
  InputBase,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  OutlineHeart,
  OutlinePhone,
  OutlinePicture,
  OutlineVideoCamera,
  Send,
} from '../../../components/Icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { socketIo } from '../../../configs';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { getUserId } from '../../../utils';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  boxContent: {
    height: '40rem',
    overflowY: 'scroll',
    padding: '2rem',
  },

  client: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1rem',
    '& > span': {
      backgroundColor: 'var(--color-white)',
      border: '1px solid var(--color-gray-message)',
    },
  },
  textMessage: {
    padding: '1.2rem 1rem',
    borderRadius: '20%',
    fontSize: '1.4rem',
  },
  user: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    '& > span': {
      backgroundColor: 'var(--color-gray-message)',
    },
  },

  formChat: {
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '4rem',
    width: '90%',
    margin: 'auto',
    border: '1px solid var(--border-gray)',
    padding: '0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const ContentSend = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{}}>
          Your Messages
        </Typography>
        <Typography
          variant="span"
          sx={{
            color: 'var(--color-8e8e8e)',
            p: 1,
            display: 'block',
            fontSize: '1.4rem',
          }}
        >
          Send private photos and messages to a friend or group.
        </Typography>
        <Button variant="contained" sx={{ display: 'block', margin: 'auto' }}>
          Send message
        </Button>
      </Box>
    </Box>
  );
};

export const ContentMessageUser = () => {
  const { idUser } = useParams();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      messageText: '',
    },
  });
  const handleSendMessage = (data) => {
    socketIo.emit('send_message', {
      idClient: idUser,
      idUser: getUserId(),
      message: data.messageText,
    });
    reset({ messageText: '' });
  };

  useEffect(() => {
    socketIo.on('receive_message', (data) => {
      console.log(data);
    });
  }, [socketIo]);
  const classes = useStyles();
  return (
    <Box sx={{ height: '100%' }} className={classes.root}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-gray)',
          padding: '0 1rem',
          height: ' 6rem',
        }}
      >
        <Box>
          <Avatar
            alt="Remy Sharp"
            src="http://localhost:5000/v1/1659004142736272911605_966139784010639_5137371691398520701_n.jpg"
            sx={{ width: '4rem', height: '4rem', mr: 2 }}
          />
        </Box>
        <Box sx={{ '& svg': { fontSize: '2.4rem' } }}>
          <IconButton>
            <OutlinePhone />
          </IconButton>
          <IconButton>
            <OutlineVideoCamera />
          </IconButton>
          <IconButton>
            <AiOutlineInfoCircle />
          </IconButton>
        </Box>
      </Box>

      {/* Content messages */}
      <Box className={classes.boxContent}>
        <Box className={classes.client}>
          <Typography variant="span" className={classes.textMessage}>
            Hello ban
          </Typography>
        </Box>
        <Box className={classes.user}>
          <Typography variant="span" className={classes.textMessage}>
            Hello ban
          </Typography>
        </Box>
        <Box className={classes.user}>
          <Typography variant="span" className={classes.textMessage}>
            Hello ban
          </Typography>
        </Box>
        <Box className={classes.client}>
          <Typography variant="span" className={classes.textMessage}>
            Hello cai qq
          </Typography>
        </Box>
        <Box className={classes.client}>
          <Typography variant="span" className={classes.textMessage}>
            Met moi
          </Typography>
        </Box>
        <Box className={classes.client}>
          <Typography variant="span" className={classes.textMessage}>
            Toi guc nga!!
          </Typography>
        </Box>
        <Box className={classes.client}>
          <Typography variant="span" className={classes.textMessage}>
            Toi dau don
          </Typography>
        </Box>
        <Box className={classes.user}>
          <Typography variant="span" className={classes.textMessage}>
            Di cafe khong ban?
          </Typography>
        </Box>
        <Box className={classes.user}>
          <Typography variant="span" className={classes.textMessage}>
            コーヒーを飲みましょうか。
          </Typography>
          　
        </Box>
        <Box className={classes.user}>
          <Typography variant="span" className={classes.textMessage}>
            EZIで会い来るね。
          </Typography>
        </Box>
        <Box className={classes.user}>
          <Typography variant="span" className={classes.textMessage}>
            コーヒーを飲みましょうか。
          </Typography>
          　
        </Box>
        <Box className={classes.user}>
          <Typography variant="span" className={classes.textMessage}>
            EZIで会い来るね。
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(handleSendMessage)}>
        <Box className={classes.formChat}>
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: '1.3rem', width: '80%' }}
            placeholder="Message"
            control={control}
            {...register('messageText')}
          />
          <Box sx={{ '& svg': { fontSize: '2.4rem' } }}>
            <IconButton>
              <OutlinePicture />
            </IconButton>
            <IconButton>
              <OutlineHeart />
            </IconButton>
            <IconButton onClick={handleSendMessage}>
              <Send />
            </IconButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
