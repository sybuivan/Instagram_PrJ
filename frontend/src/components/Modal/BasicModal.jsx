import { Dialog } from '@mui/material';
import React from 'react';

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
      sx={{
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          maxWidth: '120rem',
          maxHeight: '90rem',
        },
      }}
    >
      {component}
    </Dialog>
  );
};

BasicModal.propTypes = {};

export default BasicModal;
