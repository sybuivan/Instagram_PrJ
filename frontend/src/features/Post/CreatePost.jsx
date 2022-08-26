import { Box, Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  PostBodyShared,
  PostContent,
  PostHead,
  PostSelect,
  PostHeadShared,
} from './components';
import { BasicModal, ModalChooseItem } from '../../components';
import { ReactComponent as PicSvg } from '../../assets/images/picVideo.svg';
import { postApi } from '../../api';
import ModalPost from '../../page/Home/components/ModalPost';
import {
  fetchPostFriends,
  hiddenModal,
  showModal,
} from '../../page/Home/homeSlice';
import { getUserId, getUserName, toastify } from '../../utils';
import { ArrowLeft } from '../../components/Icons';
import { showContentPost } from '../../page/PostView/postSlice';
import { useGetPostDetail } from '../../hooks';

const useStyles = makeStyles({
  root: {
    width: '45rem',
    height: '50rem',
    '& .previewImage': {
      width: '100%',
      height: '43.5rem',
    },
  },
  postHead: {
    borderBottom: '1px solid #efefef',
    padding: '1.2rem 0',
  },
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
const CreatePost = () => {
  const dispatch = useDispatch();
  const isShowModal = useSelector((state) => state.home.modal);
  const [files, setFiles] = useState();
  const isShowContentPost = useSelector(
    (state) => state.post.isShowContentPost
  );
  const isShowEditPost = useSelector((state) => state.post.isEditPost);
  const detailsPost = useSelector((state) => state.post.detailsPost);

  const [shareSucc, setShareSucc] = useState(false);
  const [caption, setCaption] = useState('');
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { caption: '' } });
  //   show icon

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files?.map((file) => (
    <Box key={file.name}>
      <Box>
        <Box component="img" src={file.preview} className="previewImage" />
      </Box>
    </Box>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const handleOnBack = () => {
    dispatch(showModal('CANCEL'));
  };
  const handleOnClickHideModal = () => {
    dispatch(hiddenModal('CANCEL'));
  };
  const handleOnDiscard = () => {
    dispatch(hiddenModal('CANCEL'));
    setFiles();
    dispatch(showContentPost('hidden'));
  };

  const handleOnNext = () => {
    dispatch(showContentPost('show'));
  };
  const handleOnChangeCaption = (value) => {
    setCaption(value);
  };

  const handleOnShare = async () => {
    // call api share post

    try {
      // const postShare = await postApi.createPost(formData);
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('images', files[0], files[0].name);
      formData.append('user', getUserId());
      const post = await postApi.createPost(formData);
      setShareSucc(true);
      dispatch(showContentPost('hidden'));
      dispatch(fetchPostFriends(getUserName()));
    } catch (error) {}
  };
  const handleOnEditPost = async () => {
    try {
      const post = await postApi.editPostById(
        {
          caption: caption,
          user: getUserId(),
        },
        detailsPost._id
      );
      dispatch(fetchPostFriends(getUserName()));
      dispatch(hiddenModal('CREATE_POST'));
      toastify('success', 'Edit post successfully');
    } catch (error) {}
  };
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      sx={{ width: isShowContentPost || isShowEditPost ? '70rem' : '45rem' }}
    >
      {isShowEditPost ? (
        <>
          <form onSubmit={handleSubmit(handleOnEditPost)}>
            <Box className={classes.wrapperHead}>
              <PostHead
                title="Edit info"
                icon={<ArrowLeft />}
                titleButton="Done"
              />
            </Box>
            <Grid container sx={{ overflow: 'hidden' }}>
              <PostContent
                isEdit
                thumbs={detailsPost?.images}
                onChangeCaption={handleOnChangeCaption}
                caption={detailsPost?.caption}
              />
            </Grid>
          </form>
        </>
      ) : (
        <form onSubmit={handleSubmit(handleOnShare)}>
          <Box className={classes.postHead}>
            {!!files && !isShowContentPost && !shareSucc && (
              <Box className={classes.wrapperHead}>
                <PostHead
                  icon={<ArrowLeft />}
                  onClickBack={handleOnBack}
                  onClickNext={handleOnNext}
                  name="Next"
                />
              </Box>
            )}
            {!files && <PostHead title="Create new post" />}
            {isShowContentPost && (
              <Box className={classes.wrapperHead}>
                <PostHead
                  title="Create new post"
                  icon={<ArrowLeft />}
                  titleButton="Share"
                />
              </Box>
            )}
            <PostHeadShared shareSucc={shareSucc} />
          </Box>

          <Box {...getRootProps({ className: 'dropzone' })}>
            <PostSelect files={files} />
          </Box>
          <Box>
            {isShowContentPost ? (
              <Grid container sx={{ overflow: 'hidden' }}>
                <PostContent
                  thumbs={thumbs}
                  onChangeCaption={handleOnChangeCaption}
                  caption={caption}
                />
              </Grid>
            ) : (
              <>
                {shareSucc ? <PostBodyShared shareSucc={shareSucc} /> : thumbs}
              </>
            )}
          </Box>
        </form>
      )}

      <BasicModal
        component={
          <ModalPost>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '1.5rem 0',
                borderBottom: '1px solid #efefef',
                '& h5': {
                  padding: '0.7rem 0',
                  fontSize: '2rem',
                },
                '& span': {
                  fontSize: '1.3rem',
                  color: 'var(--color-8e8e8e)',
                },
              }}
            >
              <Typography variant="h5">Discard post?</Typography>
              <Typography variant="span">
                If you leave, your edits won't be saved.
              </Typography>
            </Box>
            <ModalChooseItem
              name="Discard"
              active={true}
              onDiscard={handleOnDiscard}
            />
            <ModalChooseItem name="Cancal" active={false} />
          </ModalPost>
        }
        type="CANCEL"
        showModal={isShowModal.CANCEL}
        onClickHideModal={handleOnClickHideModal}
      />
    </Box>
  );
};

CreatePost.propTypes = {};

export default CreatePost;
