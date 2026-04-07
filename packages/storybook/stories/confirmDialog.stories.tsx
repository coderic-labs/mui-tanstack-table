import { useConfirmDialog } from '@coderic-labs/mui-tanstack-table';
import { Button, Chip, Stack } from '@mui/material';
import type { Meta, StoryFn } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

const meta = {
	title: 'ConfirmDialog',
	parameters: {
		chromatic: {
			disable: true
		}
	}
} satisfies Meta;

export default meta;

const useItems = () => {
	const [items, setItems] = useState(['item 1', 'item 2', 'item 3', 'item 4']);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const toggleItem = useCallback((item: string) =>
		setSelectedItems(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]),
	[setSelectedItems]);

	const deleteItems = useCallback((toDelete: string[]) =>
		setItems(prev => prev.filter(item => !toDelete.includes(item))),
	[setItems]);

	useEffect(() => {
		setSelectedItems(prev => prev.filter(x => items.includes(x)));
	}, [items, setSelectedItems]);

	return { items, selectedItems, toggleItem, deleteItems };
};

export const Demo: StoryFn = () => {
	const { selectedItems, deleteItems, items, toggleItem } = useItems();

	const { confirmDialog, showConfirmDialog } = useConfirmDialog<string[]>({
		onConfirm: toDelete => deleteItems(toDelete),
		dialogContent: toDelete => 'You sure want to delete ' + toDelete.join(', ') + '?',
		dialogTitle: 'Delete'
	});

	return (
		<Stack gap={1} alignItems={'start'}>
			{confirmDialog}
			<Stack direction={'row'} gap={1}>
				{items.map(i =>
					<Chip key={i} label={i}
						color={selectedItems.includes(i) ? 'primary' : 'default'}
						onClick={() => toggleItem(i)}
					/>)}
			</Stack>
			<Button
				color='error'
				disabled={!selectedItems.length}
				onClick={() => showConfirmDialog(selectedItems)}>
				Delete items
			</Button>
		</Stack>
	);
};
