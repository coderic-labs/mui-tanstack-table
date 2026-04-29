import { TableRow as MuiTableRow, styled } from '@mui/material';
import { Cell, Row } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { TableBodyCell, TableBodyFillerCell } from '../cells/tableBodyCell';
import { TableDetailRow } from './tableDetailRow';
import type { GetRowStyle, RowDetailComponent } from '../types';

type TableBodyRowProps<T> = {
    row: Row<T>;
    rowDetail?: RowDetailComponent<T>;
    getRowStyle?: GetRowStyle<T>;
    tableLayout: 'auto' | 'fixed';
}

export const TableBodyRow = <T,>(props: TableBodyRowProps<T>) => {
    const { row, rowDetail, getRowStyle, tableLayout } = props;

    return (
        <>
            <DataRowStyled
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
            </DataRowStyled>
            {row.getIsExpanded() && rowDetail &&
                <TableDetailRow row={row} rowDetail={rowDetail} tableLayout={tableLayout} />}
        </>
    );
};

const DataRowStyled = styled(MuiTableRow)(({ theme }) => ({
    '--rowcolor': theme.palette.background.paper,
}));
