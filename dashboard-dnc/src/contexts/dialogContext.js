import React, { createContext, useContext, useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: 'Tem certeza que deseja continuar?',
    content: 'Tem certeza que ainda quer realizar esta ação?',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const handleOpen = useCallback((config) => {
    setDialogConfig({ ...dialogConfig, ...config }); 
    setOpen(true);
  }, [dialogConfig]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setDialogConfig({ title: '', content: '', onConfirm: () => {}, onCancel: () => {} }); 
  }, []);

  const handleConfirm = useCallback(() => {
    dialogConfig.onConfirm();
    handleClose(); 
  }, [dialogConfig, handleClose]);

  const handleCancel = useCallback(() => {
    dialogConfig.onCancel();
    handleClose();
  }, [dialogConfig, handleClose]);

  return (
    <DialogContext.Provider value={{ openDialog: handleOpen }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogConfig.title}</DialogTitle>
        <DialogContent>{dialogConfig.content}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};

export default function useDialog () {
  return useContext(DialogContext);
};
