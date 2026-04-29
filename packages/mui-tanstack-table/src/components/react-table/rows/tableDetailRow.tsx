import { TableCell as MuiTableCell, TableRow as MuiTableRow } from '@mui/material';
import { Row } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import type { RowDetailComponent } from '../types';

export type TableDetailRowProps<T> = {
    row: Row<T>,
    rowDetail: RowDetailComponent<T>;
    tableLayout: 'fixed' | 'auto';
}

export const TableDetailRow = <T,>(props: TableDetailRowProps<T>) => {
    const { row, rowDetail, tableLayout } = props;
    const colspan = row.getVisibleCells().length + (tableLayout === 'fixed' ? 1 : 0);

    return (
        <MuiTableRow
            {...getDataTestAttrs(dataTests.table.detailRow, row.id)}>
            <MuiTableCell colSpan={colspan} sx={{ overflow: 'hidden' }}>
                {rowDetail({ row })}
            </MuiTableCell>
        </MuiTableRow>
    );
};
