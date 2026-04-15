import { Close } from '@mui/icons-material';
import { IconButton, Stack, StackProps, TableSortLabel, Zoom } from '@mui/material';
import { flexRender, HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { InfoTooltip } from '../infoTooltip';
import { TableSortingOrderBadge } from './tableSortingOrderBadge';

/**
 * Renderer for table header in React Table. Renders column title, sorting and filter.
 * Use this component in the column definition's header property.
 * @param context tanstack table header context
 */
export function TableHeader<TData, TValue>(context: HeaderContext<TData, TValue> & StackProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { header, column, table, ...rest } = context;
    const canFilter = column.getCanFilter();
    const canSort = column.getCanSort();
    const isSorted = column.getIsSorted();
    const isMultiSort = column.getCanMultiSort();
    const sortIndex = column.getSortIndex();

    // if there are any visible columns with filters,
    // set height to 100% to align content
    const someFiltersInTable = table.getAllLeafColumns().some(column => column.getCanFilter() && column.getIsVisible() && column.columnDef.filter)

    const headerTitle =
        <Stack direction='row' gap={0.5} alignItems='center' whiteSpace='nowrap'>
            {column.columnDef.title ?? column.id}
            {column.columnDef.tooltip &&
                <InfoTooltip title={flexRender(column.columnDef.tooltip, context)} />}
        </Stack>;

    return (
        <Stack gap={0.5} height={someFiltersInTable ? '100%' : undefined} {...rest}>
            {!canSort && headerTitle}

            {canSort &&
                <TableSortLabel
                    {...getDataTestAttrs(dataTests.header.sortLabel)}
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        ustifyContent: 'space-between',
                        gap: 0.5,
                        '.MuiTableSortLabel-icon': { visibility: isSorted ? 'visible' : 'hidden' },
                        ':hover': { '.MuiTableSortLabel-icon': { visibility: 'visible' } }
                    }}
                    slotProps={{ icon: { sx: { margin: 0 } } }}
                    active={!!isSorted}
                    direction={isSorted || 'asc'}
                    onClick={() => column.toggleSorting(undefined, isMultiSort)}>
                    {headerTitle}
                    {isMultiSort &&
                        <Zoom in={sortIndex !== -1}>
                            <TableSortingOrderBadge sx={{ ml: 'auto' }}>
                                {Math.max(sortIndex + 1, 1)}
                            </TableSortingOrderBadge>
                        </Zoom>}
                </TableSortLabel>}
            {canFilter && column.columnDef.filter &&
                <Stack direction='row' alignItems='center' gap={1} {...getDataTestAttrs(dataTests.header.filterContainer)}>
                    {flexRender(column.columnDef.filter, context)}
                    {context.column.getIsFiltered() &&
                        <Zoom in={context.column.getIsFiltered()}>
                            <IconButton size='small' onClick={() => context.column.setFilterValue(undefined)} {...getDataTestAttrs(dataTests.header.filterClearButton)}>
                                <Close />
                            </IconButton>
                        </Zoom>}
                </Stack>}
        </Stack>
    );
}
