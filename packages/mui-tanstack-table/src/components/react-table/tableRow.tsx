import { TableCell as MuiTableCell, TableRow as MuiTableRow, Stack, Typography } from '@mui/material';
import { Row, Table } from '@tanstack/react-table';
import { useTableIntl } from '../../context/tableIntl';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import type { RowDetailComponent } from './types';

export type TableDetailRowProps<T> = {
    row: Row<T>,
    rowDetail: RowDetailComponent<T>;
}

export const TableDetailRow = <T,>(props: TableDetailRowProps<T>) => {
    const { row, rowDetail } = props;
    return (
        <MuiTableRow {...getDataTestAttrs(dataTests.table.detailRow, row.id)}>
            <MuiTableCell colSpan={row.getVisibleCells().length}>
                {rowDetail({ row })}
            </MuiTableCell>
        </MuiTableRow>
    );
};

export type TableEmptyRowProps<T> = {
    table: Table<T>,
}

export const TableEmptyRow = <T,>(props: TableEmptyRowProps<T>) => {
    const { table } = props;
    const { formatMessage } = useTableIntl();

    return (
        <MuiTableRow {...getDataTestAttrs(dataTests.table.emptyRow)}>
            <MuiTableCell colSpan={table.getVisibleLeafColumns().length}>
                <Stack width={'100%'} height={'100px'} alignItems={'center'} justifyContent={'center'} padding={2} {...getDataTestAttrs(dataTests.table.emptyState)}>
                    <Typography variant='body2' fontStyle='italic'>
                        {formatMessage({ id: 'components.reactTable.noResults' })}
                    </Typography>
                </Stack>
            </MuiTableCell>
        </MuiTableRow>
    );
};

