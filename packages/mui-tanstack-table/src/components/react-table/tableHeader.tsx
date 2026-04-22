import { useSortable } from '@dnd-kit/sortable';
import { DragIndicator } from '@mui/icons-material';
import { Stack, StackProps, Zoom } from '@mui/material';
import { flexRender, HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { InfoTooltip } from '../infoTooltip';
import { TableColumnOptionsButton } from './tableColumnOptionsButton';
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
    const canOrder = table.getState().columnOrder.includes(column.id);

    const { attributes, listeners } = useSortable({ id: column.id });

    const headerTitle =
        <Stack direction='row' gap={0.5} alignItems='center' whiteSpace='nowrap'>
            {column.columnDef.title ?? column.id}
            {column.columnDef.tooltip &&
                <InfoTooltip title={flexRender(column.columnDef.tooltip, context)} />}
        </Stack>;

    const headerSorting =
        <Stack direction='row' alignItems='center' position={'relative'}>
            <TableSortingToggle
                isSorted={isSorted}
                onToggle={() => column.toggleSorting(undefined, isMultiSort)}
            />
            {isMultiSort &&
                <Zoom in={sortIndex !== -1}>
                    <TableSortingOrderBadge sx={{ position: 'absolute', top: -3, right: -3 }}>
                        {Math.max(sortIndex + 1, 1)}
                    </TableSortingOrderBadge>
                </Zoom>}
        </Stack>

    const headerColumnOptions =
        <TableColumnOptionsButton column={column} />

    const dragIndicator =
        <DragIndicator
            {...attributes}
            {...listeners}
            fontSize='small'
            sx={{ cursor: 'grab', ml: 'auto' }}
            {...getDataTestAttrs(dataTests.header.reorderHandle, column.id)}
        />

    return (
        <Stack gap={0.5} {...rest}>
            <Stack direction='row' alignItems='center' gap={1}>
                {headerTitle}
                {canSort && headerSorting}
                {headerColumnOptions}
                {canOrder && dragIndicator}
            </Stack>
            {canFilter && column.columnDef.filter &&
                flexRender(column.columnDef.filter, context)}
        </Stack>
    );
}

