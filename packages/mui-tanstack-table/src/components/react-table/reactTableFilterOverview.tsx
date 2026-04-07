import { Clear } from '@mui/icons-material';
import { Box, Chip, Stack, styled, Typography, TypographyProps, Zoom } from '@mui/material';
import { ColumnFilter, Table } from '@tanstack/react-table';
import { useComponentsIntl } from '../../context/componentsIntl';

export type ReactTableFilterOverviewProps<T> = Omit<TypographyProps, 'children'> & {
	table: Table<T>,
	formatFilterValue?: (filter: ColumnFilter) => string
}

export const ReactTableFilterOverview = <T, >(props: ReactTableFilterOverviewProps<T>) => {
	const { table, formatFilterValue, ...rest } = props;
	const columnFilters = table.getState().columnFilters;
	const filtersCount = columnFilters.length;
	const { formatMessage } = useComponentsIntl();

	if (!filtersCount)
		return null;

	return (
		<Stack direction="row" gap={1} rowGap={0.5} flexWrap="wrap" alignItems="center">
			<Typography variant="body1" color="textSecondary" display={'flex'} flexDirection={'row'} gap={1} mt={-0.5} {...rest}>
				{formatMessage({ id: 'components.tableToolbar.filters' })}
			</Typography >
			{columnFilters.map((filter) => (
				<Zoom in>
					<Chip
						key={filter.id}
						size="small"
						sx={{ fontSize: '12px', height: 20, px: 1, backgroundColor: 'transparent !important' }}
						label={`${table.getColumn(filter.id)?.columnDef.title ?? filter.id}: ${formatFilterValue?.(filter) ?? filter.value}`}
						deleteIcon={<Clear fontSize="small" sx={{ ml: '4px !important' }} />}
						onDelete={() => table.setColumnFilters((prev) => prev.filter((f) => f.id !== filter.id))}
						variant="outlined"
					/>
				</Zoom>
			))}
			<ResetFiltersButton
				onClick={() => table.resetColumnFilters()} >
				{formatMessage({ id: 'components.tableToolbar.filtersReset' })}
				<Clear fontSize="small" sx={{ marginLeft: 0.2, marginBottom: '-3px', cursor: 'pointer' }} />
			</ResetFiltersButton>
		</Stack>
	);
};

const ResetFiltersButton = styled(Box)(({ theme }) => ({
	...theme.typography.caption,
	textDecoration: 'underline',
	cursor: 'pointer'
}));