import { TableCell as MuiTableCell } from '@mui/material';
import { Cell, flexRender, Header, Row } from '@tanstack/react-table';
import { ForwardedRef, forwardRef } from 'react';
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
};

const TableHeaderCellComponent = <T,>(props: TableHeaderCellProps<T>, ref: ForwardedRef<HTMLTableCellElement>) => {
    const { header, stickyHeader } = props;

    const headerCellStyle = useHeaderCellStyle(header.column, header.getContext().table, stickyHeader);

    return (
        <MuiTableCell
            ref={ref}
            colSpan={header.colSpan}
            {...getDataTestAttrs(dataTests.table.headerCell, header.column.id)}
            sx={headerCellStyle}>
            {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
        </MuiTableCell>
    );
};

export const TableHeaderCell = forwardRef(TableHeaderCellComponent) as <T>(
    props: TableHeaderCellProps<T> & { ref?: ForwardedRef<HTMLTableCellElement> }
) => JSX.Element;

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
