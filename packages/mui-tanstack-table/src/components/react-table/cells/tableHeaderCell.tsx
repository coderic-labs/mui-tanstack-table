import { TableCell as MuiTableCell } from '@mui/material';
import { flexRender, Header } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { getPinnedCellBackground, useDraggingStyles, useHeaderCellStyle } from '../styleUtils';
import { TableColumnResizeHandler } from '../tableColumnResizeHandler';

/**
 * Props for {@link TableHeaderCell}.
 */
export type TableHeaderCellProps<T> = {
    /** TanStack `Header` instance for this header cell. */
    header: Header<T, unknown>;
    /** When `true`, applies sticky positioning so the header stays visible while scrolling. */
    stickyHeader?: boolean;
    /** Callback ref used by the column-widths context to measure the cell's DOM width. */
    tableCellRef: (node: HTMLTableCellElement | null) => void;
    /** CSS `table-layout` value inherited from the parent `<Table>`. Enables resize handles when `"fixed"`. */
    tableLayout?: 'auto' | 'fixed';
};

/**
 * Renders a header table cell, including pinning, drag-reorder styles, and optional resize handle.
 */
export const TableHeaderCell = <T,>(props: TableHeaderCellProps<T>) => {
    const { header, stickyHeader, tableCellRef, tableLayout } = props;

    const canResize =
        tableLayout === 'fixed' &&
        header.column.getCanResize() &&
        header.getContext().table.options.enableColumnResizing;

    const headerCellStyle = useHeaderCellStyle(header, header.getContext().table, stickyHeader);
    const { draggingStyles, setNodeRef } = useDraggingStyles(header.column.id, 6);

    return (
        <MuiTableCell
            ref={(node: HTMLTableCellElement | null) => { setNodeRef(node); tableCellRef(node); }}
            colSpan={header.colSpan}
            {...getDataTestAttrs(dataTests.table.headerCell, header.column.id)}
            style={draggingStyles}
            sx={headerCellStyle}>
            {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
            {canResize && <TableColumnResizeHandler header={header} className='resize-handler' />}
        </MuiTableCell>
    );
};

type TableHeaderFillerCellProps = {
    stickyHeader?: boolean;
};

/** Empty filler cell used to fill remaining space in header rows with pinned columns. */
export const TableHeaderFillerCell = (props: TableHeaderFillerCellProps) => {
    const { stickyHeader } = props;

    return (
        <MuiTableCell
            {...getDataTestAttrs(dataTests.table.headerCell)}
            sx={{
                backgroundColor: `var(--rowcolor)`,
                padding: 0,
                zIndex: stickyHeader ? 1 : undefined,
                backgroundImage: getPinnedCellBackground
            }}>
        </MuiTableCell>
    );
};
