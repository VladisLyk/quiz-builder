import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export function InfoDialog({
    open,
    title,
    description,
    onClose,
    extraActionLabel,
    onExtraAction,
  }: {
    open: boolean;
    title: string;
    description?: string;
    onClose: () => void;
    extraActionLabel?: string;
    onExtraAction?: () => void;
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
          {onExtraAction && extraActionLabel && (
            <Button onClick={onExtraAction}>{extraActionLabel}</Button>
          )}
          <Button variant="contained" onClick={onClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }