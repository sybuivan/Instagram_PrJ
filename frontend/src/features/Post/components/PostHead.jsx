import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Box, Button, Typography } from '@mui/material';

const PostHead = ({
  icon,
  onClickBack,
  title,
  onClickNext,
  titleButton,
  name,
}) => {
  const handleOnBack = () => {
    onClickBack();
  };
  const handleOnNext = () => {
    if (!onClickNext) return;
    onClickNext();
  };
  return (
    <>
      {!!icon && <IconButton onClick={handleOnBack}>{icon}</IconButton>}
      {!!title && (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      {!!name && (
        <Box
          onClick={handleOnNext}
          sx={{
            color: 'var(--color-blue)',
            fontSize: '1.6rem',
            pr: 1,
            cursor: 'pointer',
          }}
        >
          {name}
        </Box>
      )}
      {!!titleButton && <Button type="submit">{titleButton}</Button>}
    </>
  );
};

PostHead.propTypes = {};

export default PostHead;
