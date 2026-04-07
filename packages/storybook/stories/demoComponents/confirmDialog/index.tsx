import { Button, Chip, Stack } from '@mui/material';
import { useConfirmDialog } from '@coderic/mui-tanstack-table';
import { useState } from 'react';

export const ConfirmDialogDemo = () => {
	const [items, setItems] = useState(['item 1', 'item 2', 'item 3', 'item 4']);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const { confirmDialog, showConfirmDialog } = useConfirmDialog<string[]>({
		onConfirm: toDelete => setItems(prev => prev.filter(item => toDelete.includes(item))),
		dialogContent: toDelete => 'You sure want to delete ' + toDelete.join(', ') + '?',
		dialogTitle: 'Delete'
	});

	return (
		<Stack gap={1}>
			{confirmDialog}
			<Stack direction={'row'} gap={1}>
				{items.map(i =>
					<Chip key={i} label={i}
						color={selectedItems.includes(i) ? 'error' : 'info'}
						onClick={() => setSelectedItems(prev => [...prev, i])}
					/>)}
			</Stack>
			<Button
				disabled={!selectedItems.length}
				onClick={() => showConfirmDialog(selectedItems)}>
				Delete selected items
			</Button>
		</Stack>
	);
};