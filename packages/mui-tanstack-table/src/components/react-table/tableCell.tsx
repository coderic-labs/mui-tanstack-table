import { useSortable } from '@dnd-kit/sortable';
import { TableCell as MuiTableCell } from '@mui/material';
import { Cell, flexRender, Header, Row } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useBodyCellStyle, useFooterCellStyle, useHeaderCellStyle } from './styleUtils';
import type { GetCellStyle } from './types';

export type TableBodyCellProps<T> = {
    cell: Cell<T, unknown>;
    row: Row<T>;
    getCellStyle?: GetCellStyle<T>;
};

export const TableBodyCell = <T,>(props: TableBodyCellProps<T>) => {
    const { cell, row, getCellStyle } = props;

    const bodyCellStyle = useBodyCellStyle(cell.column, cell.getContext().table, row.index % 2 === 0);
    const bodyCellStyleOverride = getCellStyle?.(cell) ?? {};

    return (
        <MuiTableCell
            {...getDataTestAttrs(dataTests.table.dataCell, `${row.id}.${cell.column.id}`)}
            sx={[bodyCellStyle, bodyCellStyleOverride]}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </MuiTableCell>
    );
};

export type TableHeaderCellProps<T> = {
    header: Header<T, unknown>;
    stickyHeader?: boolean;
    tableCellRef: (node: HTMLTableCellElement | null) => void;
};

export const TableHeaderCell = <T,>(props: TableHeaderCellProps<T>) => {
    const { header, stickyHeader, tableCellRef } = props;

    const { isDragging, setNodeRef, transform } = useSortable({ id: header.column.id });

    const headerCellStyle = useHeaderCellStyle(header.column, header.getContext().table, stickyHeader);

    return (
        <MuiTableCell
            ref={(node: HTMLTableCellElement | null) => { setNodeRef(node); tableCellRef(node); }}
            colSpan={header.colSpan}
            {...getDataTestAttrs(dataTests.table.headerCell, header.column.id)}
            style={{
                opacity: isDragging ? 0.8 : 1,
                zIndex: isDragging ? 5 : undefined,
                transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`
            }}
            sx={headerCellStyle}>
            {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
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

    return (
        <MuiTableCell
            colSpan={header.colSpan}
            {...getDataTestAttrs(dataTests.table.footerCell, header.column.id)}
            sx={footerCellStyle}>
            {flexRender(header.column.columnDef.footer, header.getContext())}
        </MuiTableCell>
    );
};
