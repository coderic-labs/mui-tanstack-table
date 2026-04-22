import { Close, FilterAlt } from '@mui/icons-material';
import { IconButton, Popover, Stack, TableSortLabel, Zoom } from '@mui/material';
import { flexRender, HeaderContext } from '@tanstack/react-table';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { InfoTooltip } from '../infoTooltip';
import { TableSortingOrderBadge } from './tableSortingOrderBadge';

/**
 * More compact renderer for table header in React Table. Renders column title, sorting and filter.
 * Filter is shown in a popover on filter icon click.
 * Use this component in the column definition's header property.
 * @param context tanstack table header context
 */
export function TableHeaderV2<TData, TValue>(context: HeaderContext<TData, TValue>) {
    const { header } = context;
    const canFilter = header.column.getCanFilter();
    const canSort = header.column.getCanSort();
    const isSorted = header.column.getIsSorted();
    const isFiltered = header.column.getIsFiltered();
    const isMultiSort = header.column.getCanMultiSort();
    const sortIndex = header.column.getSortIndex();

    const headerTitle =
        <Stack direction='row' gap={0.5} alignItems='center' whiteSpace='nowrap'>
            {header.column.columnDef.title ?? header.column.id}
            {header.column.columnDef.tooltip &&
                <InfoTooltip title={flexRender(header.column.columnDef.tooltip, context)} AnchorProps={{ fontSize: 'small' }} />}
        </Stack>;

    const [headerEl, setHeaderEl] = useState<HTMLDivElement | null>(null);

    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            ref={setHeaderEl}
            gap={0.5}
            sx={{
                '.MuiTableSortLabel-icon': { visibility: isSorted ? 'visible' : 'hidden' },
                '.filter-icon': { visibility: isFiltered ? 'visible' : 'hidden' },
                ':hover': {
                    '.MuiTableSortLabel-icon': { visibility: 'visible' },
                    '.filter-icon': { visibility: 'visible' }
                }
            }}>

            {headerTitle}

            {canFilter && header.column.columnDef.filter &&
                <FilterPopover context={context} anchorEl={headerEl} />}

            {canSort &&
                <TableSortLabel
                    {...getDataTestAttrs(dataTests.header.sortLabel)}
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 0.5
                    }}
                    slotProps={{ icon: { sx: { margin: 0 } } }}
                    active={!!isSorted}
                    direction={isSorted || 'asc'}
                    onClick={() => header.column.toggleSorting(undefined, isMultiSort)}>
                    {isMultiSort &&
                        <Zoom in={sortIndex !== -1} unmountOnExit>
                            <TableSortingOrderBadge sx={{}}>
                                {Math.max(sortIndex + 1, 1)}
                            </TableSortingOrderBadge>
                        </Zoom>}
                </TableSortLabel>}
        </Stack>
    );
}

type FilterPopoverProps<TData, TValue> = {
    context: HeaderContext<TData, TValue>;
    anchorEl: HTMLDivElement | null;
};

const FilterPopover = <TData, TValue>(props: FilterPopoverProps<TData, TValue>) => {
    const { context, anchorEl } = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <FilterAlt
                {...getDataTestAttrs(dataTests.header.filterPopoverTrigger)}
                className='filter-icon'
                sx={{ cursor: 'pointer' }}
                fontSize='small'
                onClick={e => { setOpen(true); e.stopPropagation(); }} />
            <Popover
                {...getDataTestAttrs(dataTests.header.filterPopover)}
                onClick={(e) => e.stopPropagation()}
                slotProps={{ paper: { sx: { p: 2 } } }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorEl}>
                <Filter {...context}></Filter>
            </Popover>
        </Fragment>
    );
};

const Filter = <TData, TValue>(context: HeaderContext<TData, TValue>) => {
    const { header } = context;
    const isFiltered = context.column.getIsFiltered();
    return (
        <Stack direction='row' alignItems='center' gap={1} {...getDataTestAttrs(dataTests.header.filterContainer)}>
            {flexRender(header.column.columnDef.filter, context)}
            {isFiltered &&
                <Zoom in={context.column.getIsFiltered()}>
                    <IconButton size='small' onClick={() => context.column.setFilterValue(undefined)}>
                        <Close />
                    </IconButton>
                </Zoom>}
        </Stack>
    );
};
