import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  isLoading,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this task? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
