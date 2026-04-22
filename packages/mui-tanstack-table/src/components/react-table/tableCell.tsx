import { TableCell as MuiTableCell } from '@mui/material';
import { Cell, flexRender, Header, Row } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { getPinnedCellBackground, useBodyCellStyle, useDraggingStyles, useFooterCellStyle, useHeaderCellStyle } from './styleUtils';
import { TableColumnResizeHandler } from './tableColumnResizeHandler';

export type TableBodyCellProps<T> = {
    cell: Cell<T, unknown>;
    row: Row<T>;
};

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

export type TableFooterCellProps<T> = {
    header: Header<T, unknown>;
    stickyFooter?: boolean;
};

export const TableFooterCell = <T,>(props: TableFooterCellProps<T>) => {
    const { header, stickyFooter } = props;

    const footerCellStyle = useFooterCellStyle(header.column, header.getContext().table, stickyFooter);
    const { draggingStyles, setNodeRef } = useDraggingStyles(header.column.id, 6);

    return (
        <MuiTableCell
            ref={setNodeRef}
            colSpan={header.colSpan}
            {...getDataTestAttrs(dataTests.table.footerCell, header.column.id)}
            sx={footerCellStyle}
            style={draggingStyles}>
            {flexRender(header.column.columnDef.footer, header.getContext())}
        </MuiTableCell>
    );
};

type TableFooterFillerCellProps = {
    stickyFooter?: boolean;
};

export const TableFooterFillerCell = (props: TableFooterFillerCellProps) => {
    const { stickyFooter } = props;

    return (
        <MuiTableCell
            {...getDataTestAttrs(dataTests.table.footerCell)}
            sx={{
                backgroundColor: `var(--rowcolor)`,
                padding: 0,
                position: stickyFooter ? 'sticky' : 'relative',
                zIndex: stickyFooter ? 1 : undefined,
                bottom: stickyFooter ? 0 : undefined,
                backgroundImage: getPinnedCellBackground
            }}>
        </MuiTableCell>
    );
};
