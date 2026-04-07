import { Typography, TypographyProps } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { useComponentsIntl } from '../../context/componentsIntl';

export type ReactTableResultsLabelProps<T> = Omit<TypographyProps, 'children'> & {
	table: Table<T>,
}

export const ReactTableResultsLabel = <T, >(props: ReactTableResultsLabelProps<T>) => {
	const { table, ...rest } = props;

	const { formatMessage } = useComponentsIntl();

	const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
	const selectedCount = selectedRows.length;
	const totalCount = table.options.rowCount ?? table.getFilteredRowModel().rows.length;

	const values = selectedCount
		? [selectedCount, totalCount].filter(Boolean).join(' / ')
		: totalCount.toString();

	return (
		<Typography {...rest}>
			{formatMessage({ id: 'components.tableToolbar.results' }, { values, selectedCount, totalCount })}
		</Typography>
	);
};