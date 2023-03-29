import React from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

type BasicDialogProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  errors: string[];
  onSubmit?: () => Promise<void>;
  onClose: () => void;
  isSubmitDisabled?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  hideSubmitButton?: boolean;
};

const BasicDialog = (props: BasicDialogProps) => {
  const {
    open,
    title,
    children,
    onSubmit,
    onClose,
    errors,
    isSubmitDisabled = false,
    submitButtonText = 'Submit',
    cancelButtonText = 'Cancel',
    hideSubmitButton = false
  } = props;

  const [submitting, setSubmitting] = React.useState(false);

  const submit = async () => {
    if (onSubmit) {
      setSubmitting(true);
      try {
        await onSubmit();
      }
      catch (e) {
        console.error(e)
      }
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
        {errors.length > 0 && (
          <div>
            {errors.map((error, index) => (
              <Typography key={index} color="error" variant="subtitle2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} tabIndex={hideSubmitButton ? 1 : -1}>{cancelButtonText}</Button>
        {!hideSubmitButton && onSubmit && (
          <Button
            onClick={submit}
            variant="contained"
            color="primary"
            disabled={isSubmitDisabled || submitting || errors.length > 0}
          >
            {submitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              submitButtonText
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BasicDialog;
