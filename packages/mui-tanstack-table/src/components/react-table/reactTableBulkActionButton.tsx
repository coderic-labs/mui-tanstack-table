import { Button, ButtonProps } from '@mui/material';
import { Table } from '@tanstack/react-table';

export type ReactTableBulkActionButtonProps<T> = Omit<ButtonProps, 'onClick'> & {
	table: Table<T>,
	onClick: (selectedRows: T[], e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ReactTableBulkActionButton = <T, >(props: ReactTableBulkActionButtonProps<T>) => {
	const { table, onClick, disabled, ...rest } = props;
	const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
	return (
		<Button
			onClick={(e) => onClick(selectedRows, e)}
			disabled={disabled ?? !selectedRows.length}
			{...rest}
		/>
	);
};