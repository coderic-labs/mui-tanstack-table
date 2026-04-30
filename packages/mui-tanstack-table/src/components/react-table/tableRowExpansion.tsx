import { KeyboardArrowDown, KeyboardArrowUp, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CellContext, HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';

/**
 * Cell renderer that shows an expand/collapse icon button for rows that support expansion.
 * Renders `null` when `row.getCanExpand()` is `false`.
 * Assign to the `cell` property of a dedicated expansion column.
 */
export function TableRowExpansionCell<T>({ row }: CellContext<T, unknown>) {
    if (!row.getCanExpand())
        return null;

    return (
        <IconButton
            {...getDataTestAttrs(dataTests.rowExpansion.rowToggleButton)}
            size='small'
            onClick={row.getToggleExpandedHandler()}>
            {row.getIsExpanded() ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        </IconButton>
    );
}

/**
 * Column header that renders a collapse-all icon button.
 * The button is disabled when no rows are expanded.
 * Assign to the `header` property of the expansion column.
 */
export function TableRowExpansionHeader<T>({ table }: HeaderContext<T, unknown>) {
    return (
        <IconButton
            {...getDataTestAttrs(dataTests.rowExpansion.resetButton)}
            size='small'
            disabled={!table.getIsSomeRowsExpanded()}
            onClick={() => table.resetExpanded(false)}>
            <KeyboardArrowUp />
        </IconButton>
    );
}

/** Semantic alias for {@link TableRowExpansionCell}. */
export const TableExpandRowButton = TableRowExpansionCell;
