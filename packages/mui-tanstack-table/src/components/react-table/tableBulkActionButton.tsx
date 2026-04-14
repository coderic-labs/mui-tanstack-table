import { Button, ButtonProps } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';

export type TableBulkActionButtonProps<T> = Omit<ButtonProps, 'onClick'> & {
	table: Table<T>,
	onClick: (selectedRows: T[], e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const TableBulkActionButton = <T, >(props: TableBulkActionButtonProps<T>) => {
	const { table, onClick, disabled, ...rest } = props;
	const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
	return (
		<Button
			{...getDataTestAttrs(dataTests.bulkAction.button)}
			onClick={(e) => onClick(selectedRows, e)}
			disabled={disabled ?? !selectedRows.length}
			{...rest}
		/>
	);
};