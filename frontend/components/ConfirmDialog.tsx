import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export function ConfirmDialog({
    open,
    title,
    description,
    onClose,
    onConfirm,
  }: {
    open: boolean;
    title: string;
    description?: string;
    onClose: () => void;
    onConfirm: () => void;
  }) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        {description && (
            <DialogContent>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
