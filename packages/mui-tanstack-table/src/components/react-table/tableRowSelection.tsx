import { Checkbox } from '@mui/material';
import { CellContext, HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';

/**
 * Column header that renders a "select all on current page" checkbox.
 * Shows indeterminate state when only some rows are selected.
 * Assign to the `header` property of a selection column.
 */
export function TableRowSelectionHeader<T>({ table }: HeaderContext<T, unknown>) {
    return (
        <Checkbox
            {...getDataTestAttrs(dataTests.rowSelection.headerCheckbox)}
            sx={{ padding: 1, margin: -1 }}
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
    );
}

/**
 * Cell renderer that shows a row-selection checkbox.
 * Shows indeterminate state when only some sub-rows are selected.
 * Assign to the `cell` property of a selection column.
 */
export function TableRowSelectionCell<T>({ row }: CellContext<T, unknown>) {
    return (
        <Checkbox
            {...getDataTestAttrs(dataTests.rowSelection.rowCheckbox)}
            sx={{ padding: 1, margin: -1 }}
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
        />
    );
}