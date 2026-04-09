import { ConfirmDialogProps } from '@coderic-labs/mui-tanstack-table';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Row } from '@tanstack/react-table';
import { allEmploymentTypes, allTechs, Developer } from './_data';

export const employmentOptions = allEmploymentTypes.map(employmentType => ({ value: employmentType, label: 'label_' + employmentType }));
export const techOptions = allTechs.map(tech => ({ value: tech, label: 'label_' + tech }));
export const verifiedLabels = { checked: 'yes', unchecked: 'no', undetermined: 'all' };

export const RowDetail = ({ row }: { row: Row<Developer> }) => {
	return (
		<code>{JSON.stringify(row.original)}</code>
	);
};

export const ConfirmDeleteDialog = (props: ConfirmDialogProps<Developer[]>) => {
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
