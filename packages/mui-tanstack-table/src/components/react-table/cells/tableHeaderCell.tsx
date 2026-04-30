import { TableCell as MuiTableCell } from '@mui/material';
import { flexRender, Header } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { getPinnedCellBackground, useDraggingStyles, useHeaderCellStyle } from '../styleUtils';
import { TableColumnResizeHandler } from '../tableColumnResizeHandler';

export type TableHeaderCellProps<T> = {
    header: Header<T, unknown>;
    stickyHeader?: boolean;
    tableCellRef: (node: HTMLTableCellElement | null) => void;
    tableLayout?: 'auto' | 'fixed';
};

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
