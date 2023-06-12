import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const PopupMaker = (props) => {
  const { Component, setOpen, open } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Component {...props}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

PopupMaker.propTypes = {
  Component: PropTypes.elementType.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PopupMaker;
