import { Box, Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { PostHead } from './components';
import { BasicModal, ModalChooseItem } from '../../components';
import { ReactComponent as PicSvg } from '../../assets/images/picVideo.svg';
import { postApi } from '../../api';
import ModalPost from '../../page/Home/components/ModalPost';
import { hiddenModal, showModal } from '../../page/Home/homeSlice';
import PostContent from './components/PostContent';
import { getUserId } from '../../utils';

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
  const [isPostContent, setIsPostContent] = useState(false);
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
    setIsPostContent(false);
  };

  const handleOnNext = () => {
    console.log('NEXT');
    setIsPostContent(true);
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
      console.log(post);
      setShareSucc(true);
      setIsPostContent(false);
    } catch (error) {}
  };
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      sx={{ width: isPostContent ? '70rem' : '45rem' }}
    >
      <form onSubmit={handleSubmit(handleOnShare)}>
        <Box className={classes.postHead}>
          {!!files && !isPostContent && !shareSucc && (
            <Box className={classes.wrapperHead}>
              <PostHead
                icon={<BsArrowLeft />}
                onClickBack={handleOnBack}
                onClickNext={handleOnNext}
                name="Next"
              />
            </Box>
          )}
          {!files && <PostHead title="Create new post" />}
          {isPostContent && (
            <Box className={classes.wrapperHead}>
              <PostHead
                title="Create new post"
                icon={<BsArrowLeft />}
                titleButton="Share"
              />
            </Box>
          )}
          {shareSucc && (
            <Box
              className={classes.wrapperHead}
              sx={{ justifyContent: 'center' }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: 'center', fontWeight: '600' }}
              >
                Post shared
              </Typography>
            </Box>
          )}
        </Box>
        {!files ? (
          <Box {...getRootProps({ className: 'dropzone' })}>
            <Box className={classes.wrapperPic}>
              <Box className={classes.boxPic}>
                <PicSvg />
                <Typography variant="h5">
                  Drag photos and videos here
                </Typography>
              </Box>

              <Box>
                <Button variant="contained">Select from computer</Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            {isPostContent ? (
              <Grid container sx={{ overflow: 'hidden' }}>
                <PostContent
                  thumbs={thumbs}
                  onChangeCaption={handleOnChangeCaption}
                  caption={caption}
                />
              </Grid>
            ) : (
              <>
                {shareSucc ? (
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
                      <Typography variant="h5">
                        Your post has been shared
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  thumbs
                )}
              </>
            )}
          </Box>
        )}
      </form>
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
