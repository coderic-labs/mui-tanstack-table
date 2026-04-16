import { Close } from '@mui/icons-material';
import { IconButton, Stack, StackProps, Zoom } from '@mui/material';
import { flexRender, HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { InfoTooltip } from '../infoTooltip';
import { TableSortingOrderBadge } from './tableSortingOrderBadge';
import { TableSortingToggle } from './tableSortingToggle';

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

    const headerTitle =
        <Stack direction='row' gap={0.5} alignItems='center' whiteSpace='nowrap'>
            {column.columnDef.title ?? column.id}
            {column.columnDef.tooltip &&
                <InfoTooltip title={flexRender(column.columnDef.tooltip, context)} />}
        </Stack>;

    const headerSorting =
        <Stack direction='row' alignItems='center' gap={0.5}>
            <TableSortingToggle
                isSorted={isSorted}
                onToggle={() => column.toggleSorting(undefined, isMultiSort)}
            />
            {isMultiSort &&
                <Zoom in={sortIndex !== -1}>
                    <TableSortingOrderBadge>
                        {Math.max(sortIndex + 1, 1)}
                    </TableSortingOrderBadge>
                </Zoom>}
        </Stack>

    const headerFilter =
        <Stack direction='row' alignItems='center' gap={1} {...getDataTestAttrs(dataTests.header.filterContainer)}>
            {flexRender(column.columnDef.filter, context)}
            {context.column.getIsFiltered() &&
                <Zoom in={context.column.getIsFiltered()}>
                    <IconButton size='small' onClick={() => context.column.setFilterValue(undefined)} {...getDataTestAttrs(dataTests.header.filterClearButton)}>
                        <Close />
                    </IconButton>
                </Zoom>}
        </Stack>

    return (
        <Stack gap={0.5} {...rest}>
            <Stack direction='row' alignItems='center' gap={0.5}>
                {headerTitle}
                {canSort && headerSorting}
            </Stack>
            {canFilter && column.columnDef.filter && headerFilter}
        </Stack>
    );
}
