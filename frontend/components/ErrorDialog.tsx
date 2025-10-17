import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export function ErrorDialog({
    open,
    title = "Error",
    description,
    onClose,
  }: {
    open: boolean;
    title?: string;
    description?: string;
    onClose: () => void;
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
          <Button variant="contained" onClick={onClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }