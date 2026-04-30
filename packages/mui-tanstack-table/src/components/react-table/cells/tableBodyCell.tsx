import { TableCell as MuiTableCell } from '@mui/material';
import { Cell, flexRender, Row } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { getPinnedCellBackground, useBodyCellStyle, useDraggingStyles } from '../styleUtils';

/**
 * Props for {@link TableBodyCell}.
 */
export type TableBodyCellProps<T> = {
    /** TanStack `Cell` instance for this column/row intersection. */
    cell: Cell<T, unknown>;
    /** TanStack `Row` instance for the containing row. */
    row: Row<T>;
};

/**
 * Renders a body table cell, including pinning and drag-reorder styles.
 */
export const TableBodyCell = <T,>(props: TableBodyCellProps<T>) => {
    const { cell, row, } = props;

    const bodyCellStyle = useBodyCellStyle(cell.column, cell.getContext().table);
    const { draggingStyles, setNodeRef } = useDraggingStyles(cell.column.id, 5);

    return (
        <MuiTableCell
            ref={setNodeRef}
            {...getDataTestAttrs(dataTests.table.dataCell, `${row.id}.${cell.column.id}`)}
            sx={[bodyCellStyle]}
            style={draggingStyles}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </MuiTableCell>
    );
};

/** Empty filler cell used to fill remaining space in body rows with pinned columns. */
export const TableBodyFillerCell = () => {
    return (
        <MuiTableCell
            {...getDataTestAttrs(dataTests.table.dataCell)}
            sx={{
                backgroundColor: `var(--rowcolor)`,
                backgroundImage: getPinnedCellBackground,
                padding: 0
            }}>
        </MuiTableCell>
    );
};
