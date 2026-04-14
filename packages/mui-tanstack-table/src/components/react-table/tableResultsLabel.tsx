import { Typography, TypographyProps } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useTableIntl } from '../../context/tableIntl';

export type TableResultsLabelProps<T> = Omit<TypographyProps, 'children'> & {
	table: Table<T>,
}

export const TableResultsLabel = <T,>(props: TableResultsLabelProps<T>) => {
	const { table, ...rest } = props;

	const { formatMessage } = useTableIntl();

	const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
	const selectedCount = selectedRows.length;
	const totalCount = table.options.rowCount ?? table.getFilteredRowModel().rows.length;

	const values = selectedCount
		? [selectedCount, totalCount].filter(Boolean).join(' / ')
		: totalCount.toString();

	return (
		<Typography {...getDataTestAttrs(dataTests.results.label)} {...rest}>
			{formatMessage({ id: 'tableToolbar.results' }, { values, selectedCount, totalCount })}
		</Typography>
	);
};