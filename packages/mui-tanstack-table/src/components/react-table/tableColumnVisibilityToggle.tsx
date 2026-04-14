import { ViewColumn } from '@mui/icons-material';
import { Checkbox, Divider, IconButton, IconButtonProps, ListItemText, Menu, MenuItem } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import { dataTests, getDataTestAttrs } from '../../dataTests';

type TableColumnVisibilityToggleProps<T> = IconButtonProps & {
	table: Table<T>;
};

export function TableColumnVisibilityToggle<T>(props: TableColumnVisibilityToggleProps<T>) {
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
				{...getDataTestAttrs(dataTests.columnVisibility.toggleButton)}
				ref={setAnchorEl}
				onClick={() => setOpen(true)}
				{...rest}>
				<ViewColumn />
			</IconButton>
			<Menu
				{...getDataTestAttrs(dataTests.columnVisibility.menu)}
				anchorEl={anchorEl}
				open={open}
				onClose={() => setOpen(false)}>
				<MenuItem onClick={toggleAll} {...getDataTestAttrs(dataTests.columnVisibility.toggleAllItem)}>
					<Checkbox
						checked={allVisible}
						indeterminate={!allVisible && someVisible} />
					<ListItemText primary="All columns" />
				</MenuItem>
				<Divider />
				{columns.map((column) => (
					<MenuItem key={column.id} onClick={column.getToggleVisibilityHandler()} {...getDataTestAttrs(dataTests.columnVisibility.columnItem, column.id)}>
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