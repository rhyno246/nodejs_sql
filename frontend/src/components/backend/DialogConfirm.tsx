import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
interface DialogConFirmProps {
  open: boolean;
  id: any;
  onClose: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
}

const DialogConFirm: React.FunctionComponent<DialogConFirmProps> = ({
  open,
  onClose,
  id,
  onDelete,
}: DialogConFirmProps) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be changed , are you sure you want to delete
            feild
          </DialogContentText>
          <DialogContentText sx={{ fontSize: 30 }}>{id}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onDelete}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogConFirm;
