import { TableCell as MuiTableCell } from '@mui/material';
import { Cell, flexRender, Row } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { getCellStyle as getBaseCellStyle } from './styleUtils';
import type { GetCellStyle } from './types';

export type TableCellProps<T> = {
    cell: Cell<T, unknown>;
    row: Row<T>;
    getCellStyle?: GetCellStyle<T>;
};

export const TableCell = <T,>(props: TableCellProps<T>) => {
    const { cell, row, getCellStyle } = props;
    const baseStyle = getBaseCellStyle({ column: cell.column, area: 'body', even: row.index % 2 === 0 });
    const tableCellStyle = getCellStyle?.(cell);

    return (
        <MuiTableCell
            {...getDataTestAttrs(dataTests.table.dataCell, `${row.id}.${cell.column.id}`)}
            sx={[baseStyle, tableCellStyle ?? {}]}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </MuiTableCell>
    );
};
