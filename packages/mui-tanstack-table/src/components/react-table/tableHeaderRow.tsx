import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { TableRow as MuiTableRow } from '@mui/material';
import { HeaderGroup, Table as TanstackTable } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { TableHeaderCell, TableHeaderFillerCell } from './tableCell';

type TableHeaderRowProps<T> = {
    headerGroup: HeaderGroup<T>;
    table: TanstackTable<T>;
    stickyHeader?: boolean;
    tableLayout: 'auto' | 'fixed';
    registerHeaderCell: (columnId: string, el: HTMLTableCellElement | null) => void;
    headerGroupIndex: number;
}

export const TableHeaderRow = <T,>(props: TableHeaderRowProps<T>) => {
    const { headerGroup, table, stickyHeader, tableLayout, registerHeaderCell, headerGroupIndex } = props;
    const columnOrder = table.getState().columnOrder;

    return (
        <MuiTableRow
            sx={{ '--rowcolor': theme => theme.palette.background.paper }}
            {...getDataTestAttrs(dataTests.table.headerRow, headerGroupIndex + 1)}>
            <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}>
                {headerGroup.headers.map((header) =>
                    <TableHeaderCell
                        key={header.id}
                        tableCellRef={el => registerHeaderCell(header.column.id, el)}
                        header={header}
                        stickyHeader={stickyHeader}
                        tableLayout={tableLayout}
                    />
                )}
            </SortableContext>
            {tableLayout === 'fixed' && <TableHeaderFillerCell stickyHeader={stickyHeader} />}
        </MuiTableRow>
    );
};