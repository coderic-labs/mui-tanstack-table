import { TableCell as MuiTableCell } from '@mui/material';
import { Cell, flexRender, Header, Row } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useBodyCellStyle, useDraggingStyles, useFooterCellStyle, useHeaderCellStyle } from './styleUtils';
import { TableColumnResizeHandler } from './tableColumnResizeHandler';
import type { GetCellStyle } from './types';

export type TableBodyCellProps<T> = {
    cell: Cell<T, unknown>;
    row: Row<T>;
    getCellStyle?: GetCellStyle<T>;
};

export const TableBodyCell = <T,>(props: TableBodyCellProps<T>) => {
    const { cell, row, getCellStyle } = props;

    const bodyCellStyle = useBodyCellStyle(cell.column, cell.getContext().table);
    const bodyCellStyleOverride = getCellStyle?.(cell) ?? {};
    const { draggingStyles, setNodeRef } = useDraggingStyles(cell.column.id, 5);

    return (
        <MuiTableCell
            ref={setNodeRef}
            {...getDataTestAttrs(dataTests.table.dataCell, `${row.id}.${cell.column.id}`)}
            sx={[bodyCellStyle, bodyCellStyleOverride]}
            style={draggingStyles}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            {canResize && <TableColumnResizeHandler header={header} className='resize-handler'/>}
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

