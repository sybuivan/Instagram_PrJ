import React, { useEffect, useRef, useState } from 'react';
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

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { getUserId } from '../../../utils';
import messagesApi from '../../../api/messagesApi';
import { io } from 'socket.io-client';

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

var connectionOptions = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
};

var socketIo = io.connect('http://localhost:5000', connectionOptions);

export const ContentMessageUser = () => {
  const { idUser } = useParams();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  const [isSend, setIsSend] = useState(false);

  useEffect(() => {
    socketIo.emit(
      'join',
      { toUser: getUserId(), fromUser: idUser },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
    return () => {
      // socketIo.emit('disconnect');
      // socketIo.off();
    };
  }, [idUser]);
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
    console.log(data);
    socketIo.emit('send-msg', {
      toUser: getUserId(),
      fromUser: idUser,
      textMessage: data.messageText,
    });
    reset({ messageText: '' });
    setIsSend((pre) => !pre);
  };

  useEffect(() => {
    socketIo.on('msg-recieve', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    (async () => {
      try {
        const { messages, user } = await messagesApi.getListMessageUser(idUser);
        setMessages(messages);
        setUser(user);
      } catch (error) {}
    })();
  }, [idUser]);
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& h5': { fontWeight: '600' },
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={`http://localhost:5000/v1/${user[0]?.avatar}`}
            sx={{ width: '4rem', height: '4rem', mr: 2 }}
          />
          <Typography variant="h5">{user[0]?.fullName}</Typography>
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
        {messages.map((message, index) => (
          <Box
            className={message?.user_id ? classes.user : classes.client}
            key={index}
          >
            <Typography variant="span" className={classes.textMessage}>
              {message.text_message}
            </Typography>
          </Box>
        ))}
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
