import { Clear } from '@mui/icons-material';
import { Box, Chip, Stack, styled, Typography, TypographyProps, Zoom } from '@mui/material';
import { ColumnFilter, Table } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useTableIntl } from '../../context/tableIntl';

export type TableFilterOverviewProps<T> = Omit<TypographyProps, 'children'> & {
    table: Table<T>,
    formatFilterValue?: (filter: ColumnFilter) => string
}

export const TableFilterOverview = <T, >(props: TableFilterOverviewProps<T>) => {
    const { table, formatFilterValue, ...rest } = props;
    const columnFilters = table.getState().columnFilters;
    const filtersCount = columnFilters.length;
    const { formatMessage } = useTableIntl();

    if (!filtersCount)
        return null;

    return (
        <Stack direction="row" gap={1} rowGap={0.5} flexWrap="wrap" alignItems="center" {...getDataTestAttrs(dataTests.filterOverview.root)}>
            <Typography variant="body1" color="textSecondary" display={'flex'} flexDirection={'row'} gap={1} mt={-0.5} {...rest}>
                {formatMessage({ id: 'tableToolbar.filters' })}
            </Typography >
            {columnFilters.map((filter, filterIndex) => (
                <Zoom in key={filter.id}>
                    <Chip
                        key={filter.id}
                        {...getDataTestAttrs(dataTests.filterOverview.chip, filterIndex + 1)}
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
                {...getDataTestAttrs(dataTests.filterOverview.resetButton)}
                onClick={() => table.resetColumnFilters()} >
                {formatMessage({ id: 'tableToolbar.filtersReset' })}
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