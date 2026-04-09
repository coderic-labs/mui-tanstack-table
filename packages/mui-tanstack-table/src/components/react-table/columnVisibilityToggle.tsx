import { ViewColumn } from '@mui/icons-material';
import { Checkbox, Divider, IconButton, IconButtonProps, ListItemText, Menu, MenuItem } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { Fragment, useState } from 'react';

type ReactTableColumnVisibilityToggleProps<T> = IconButtonProps & {
	table: Table<T>;
};

export function ReactTableColumnVisibilityToggle<T>(props: ReactTableColumnVisibilityToggleProps<T>) {
	const { table, ...rest } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);

	const columns = table.getAllColumns().filter(col => col.getCanHide());

	if (columns.length === 0)
		return null;

	const allVisible = columns.every(col => col.getIsVisible());
	const someVisible = columns.some(col => col.getIsVisible());

	const toggleAll = () => {
		const shouldHide = allVisible;
		columns.forEach(col => col.toggleVisibility(!shouldHide));
	};

	return (
		<Fragment>
			<IconButton
				ref={setAnchorEl}
				color="secondary"
				onClick={() => setOpen(true)}
				{...rest}>
				<ViewColumn />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={() => setOpen(false)}>
				<MenuItem onClick={toggleAll}>
					<Checkbox
						checked={allVisible}
						indeterminate={!allVisible && someVisible} />
					<ListItemText primary="All columns" />
				</MenuItem>
				<Divider />
				{columns.map(column => (
					<MenuItem key={column.id} onClick={column.getToggleVisibilityHandler()}>
						<Checkbox
							checked={column.getIsVisible()} />
						<ListItemText
							primary={column.columnDef.title ?? column.id} />
					</MenuItem>
				))}
			</Menu>
		</Fragment>
	);
}