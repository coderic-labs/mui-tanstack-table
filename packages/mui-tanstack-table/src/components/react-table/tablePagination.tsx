import { MenuItem, Pagination, Select, Stack, StackProps, Typography } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { useTableIntl } from '../../context/tableIntl';

const defaultOptions = [10, 25, 50, 100];

export type TablePaginationProps<TData> = StackProps & {
	table: Table<TData>;
	options?: number[];
}

export const TablePagination = <TData, >(props: TablePaginationProps<TData>) => {
	const { table, options = defaultOptions, ...rest } = props;
	const pageOptions = table.getPageOptions();
	const { pagination } = table.getState();
	const { formatMessage } = useTableIntl();

	return (
		<Stack direction="row" justifyContent="space-between" alignItems="center" {...rest}>
			<Pagination
				sx={{ margin: 0 }}
				count={pageOptions.length}
				page={pagination.pageIndex + 1}
				onChange={(_, v) => table.setPageIndex(v - 1)}
				color="primary"
				variant="outlined"
				showFirstButton
				showLastButton
			/>
			<Stack direction="row" spacing={1} alignItems="center">
				<Typography variant="body2" color='textSecondary'>
					{formatMessage({ id: 'tablePagination.rowPerPage' })}
				</Typography>
				<Select
					id="demo-controlled-open-select"
					value={pagination.pageSize}
					onChange={(event) => table.setPageSize(Number(event.target.value))}
					size="small"
					variant='standard'
					sx={{ width: 55 }}>
					{options.map((option: number) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</Stack>
		</Stack>
	);
};
