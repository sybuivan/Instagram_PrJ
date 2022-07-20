import React from 'react';
import PropTypes from 'prop-types';
import { Box, Dialog, Typography } from '@mui/material';

const BasicModal = ({ component, showModal, onClickHideModal, type }) => {
  return (
    <Dialog
      open={showModal}
      onClose={() => {
        if (!onClickHideModal) return;
        onClickHideModal(type);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {component}
    </Dialog>
  );
};

BasicModal.propTypes = {};

export default BasicModal;
