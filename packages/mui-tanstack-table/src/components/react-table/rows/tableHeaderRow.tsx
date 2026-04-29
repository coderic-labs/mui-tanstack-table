import { TableRow as MuiTableRow } from '@mui/material';
import { HeaderGroup } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { TableHeaderCell, TableHeaderFillerCell } from '../cells/tableHeaderCell';

type TableHeaderRowProps<T> = {
    headerGroup: HeaderGroup<T>;
    stickyHeader?: boolean;
    tableLayout: 'auto' | 'fixed';
    registerHeaderCell: (columnId: string, el: HTMLTableCellElement | null) => void;
    headerGroupIndex: number;
}

export const TableHeaderRow = <T,>(props: TableHeaderRowProps<T>) => {
    const { headerGroup, stickyHeader, tableLayout, registerHeaderCell, headerGroupIndex } = props;

    return (
        <MuiTableRow
            sx={{ '--rowcolor': theme => theme.palette.background.paper }}
            {...getDataTestAttrs(dataTests.table.headerRow, headerGroupIndex + 1)}>
            {headerGroup.headers.map((header) =>
                <TableHeaderCell
                    key={header.id}
                    tableCellRef={el => registerHeaderCell(header.column.id, el)}
                    header={header}
                    stickyHeader={stickyHeader}
                    tableLayout={tableLayout}
                />
            )}
            {tableLayout === 'fixed' && <TableHeaderFillerCell stickyHeader={stickyHeader} />}
        </MuiTableRow>
    );
};
