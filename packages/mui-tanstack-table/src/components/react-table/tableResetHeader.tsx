import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';

export function TableResetHeader<T>({ table }: HeaderContext<T, unknown>) {
    return (
        <IconButton
            {...getDataTestAttrs(dataTests.resetHeader.button)}
            size='small'
            disabled={!table.getIsSomeRowsExpanded() && !table.getState().columnFilters.length && table.getState().pagination.pageIndex === 0 && !table.getState().sorting.length}
            onClick={() => {
                if (table.getIsSomeRowsExpanded())
                    table.resetExpanded();
                if (table.getState().columnFilters.length)
                    table.resetColumnFilters(true);
                if (table.getState().pagination.pageIndex !== 0)
                    table.resetPageIndex(true);
                if (table.getState().globalFilter)
                    table.resetGlobalFilter(true);
                if (table.getState().sorting.length)
                    table.resetSorting(true);
            }}>
            <Close />
        </IconButton>
    );
}
