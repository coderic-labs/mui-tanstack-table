import { TableCell as MuiTableCell, TableRow as MuiTableRow, Stack, Typography } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { useTableIntl } from '../../context/tableIntl';
import { dataTests, getDataTestAttrs } from '../../dataTests';

export type TableEmptyRowProps<T> = {
    table: Table<T>,
    tableLayout: 'fixed' | 'auto';
}

export const TableEmptyRow = <T,>(props: TableEmptyRowProps<T>) => {
    const { table, tableLayout } = props;
    const { formatMessage } = useTableIntl();

    const colspan = table.getVisibleLeafColumns().length + (tableLayout === 'fixed' ? 1 : 0);

    return (
        <MuiTableRow {...getDataTestAttrs(dataTests.table.emptyRow)}>
            <MuiTableCell colSpan={colspan}>
                <Stack width={'100%'} height={'100px'} alignItems={'center'} justifyContent={'center'} padding={2} {...getDataTestAttrs(dataTests.table.emptyState)}>
                    <Typography variant='body2' fontStyle='italic'>
                        {formatMessage({ id: 'reactTable.noResults' })}
                    </Typography>
                </Stack>
            </MuiTableCell>
        </MuiTableRow>
    );
};
