import { ConfirmDialogProps } from '@coderic-labs/mui-tanstack-table';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const ConfirmDeleteDialog = (props: ConfirmDialogProps<string[]>) => {
    const { open, data, onClose, onConfirm } = props;

    return (
        <Dialog
            open={open}
            onClose={onClose}>
            <DialogTitle>
                Delete
            </DialogTitle>
            <DialogContent>
                Delete {data?.length} items?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
};
