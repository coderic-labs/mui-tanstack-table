import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useComponentsIntl } from '../../context/componentsIntl';

export type UseConfirmDialogArgs<TData> = Omit<DialogProps, 'open' | 'onClose' | 'children'> & {
	onConfirm: (data: TData) => void;
	dialogTitle: React.ReactNode;
	dialogContent: (data: TData) => React.ReactNode;
	buttonCancelProps?: Omit<ButtonProps, 'onClick'>;
	buttonConfirmProps?: Omit<ButtonProps, 'onClick'>;
}

export const useConfirmDialog = <TData, >(args: UseConfirmDialogArgs<TData>) => {
	const { onConfirm, dialogContent, dialogTitle, buttonCancelProps, buttonConfirmProps, ...rest } = args;
	const [open, setOpen] = useState(false);
	const [data, setData] = useState<TData>();

	const { formatMessage } = useComponentsIntl();

	const showConfirmDialog = useCallback((data: TData) => {
		setData(data);
		setOpen(true);
	}, [setData, setOpen]);

	const confirmDialog = (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			{...rest}>
			<DialogTitle>
				{dialogTitle}
			</DialogTitle>
			<DialogContent>
				{data && dialogContent(data as TData)}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => { setOpen(false); }}
					{...buttonCancelProps}>
					{formatMessage({ id: 'common.cancel' })}
				</Button>
				<Button
					onClick={() => { setOpen(false); onConfirm(data as TData); }}
					color="error"
					variant="contained"
					{...buttonConfirmProps}>
					{formatMessage({ id: 'common.delete' })}
				</Button>
			</DialogActions>
		</Dialog>
	);

	return { confirmDialog, showConfirmDialog };
};
