import { TableRow as MuiTableRow, styled } from '@mui/material';
import { Cell, Row } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { TableBodyCell, TableBodyFillerCell } from '../cells/tableBodyCell';
import type { GetRowStyle } from '../types';

type TableBodyRowProps<T> = {
    row: Row<T>;
    getRowStyle?: GetRowStyle<T>;
    tableLayout: 'auto' | 'fixed';
}

export const TableBodyRow = <T,>(props: TableBodyRowProps<T>) => {
    const { row, getRowStyle, tableLayout } = props;

    return (
        <TableRowStyled
            {...getDataTestAttrs(dataTests.table.dataRow, row.id)}
            sx={getRowStyle ? getRowStyle(row) : undefined}>
            {row.getVisibleCells().map((cell: Cell<T, unknown>) =>
                <TableBodyCell
                    key={cell.id}
                    cell={cell}
                    row={row}
                />
            )}
            {tableLayout === 'fixed' && <TableBodyFillerCell />}
        </TableRowStyled>
    );
};

const TableRowStyled = styled(MuiTableRow)(({ theme }) => ({
    '--rowcolor': theme.palette.background.paper,
}));
