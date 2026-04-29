import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { TableRow as MuiTableRow } from '@mui/material';
import { HeaderGroup, Table as TanstackTable } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { TableFooterCell, TableFooterFillerCell } from '../cells/tableFooterCell';

type TableFooterRowProps<T> = {
    footerGroup: HeaderGroup<T>;
    table: TanstackTable<T>;
    stickyFooter?: boolean;
    tableLayout: 'auto' | 'fixed';
    footerGroupIndex: number;
}

export const TableFooterRow = <T,>(props: TableFooterRowProps<T>) => {
    const { footerGroup, table, stickyFooter, tableLayout, footerGroupIndex } = props;
    const columnOrder = table.getState().columnOrder;

    return (
        <MuiTableRow
            {...getDataTestAttrs(dataTests.table.footerRow, footerGroupIndex + 1)}
            sx={{ '--rowcolor': theme => theme.palette.background.paper }}>
            {footerGroup.headers.map((header) =>
                <SortableContext
                    key={header.id}
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}>
                    <TableFooterCell
                        key={header.id}
                        header={header}
                        stickyFooter={stickyFooter}
                    />
                </SortableContext>
            )}
            {tableLayout === 'fixed' && <TableFooterFillerCell stickyFooter={stickyFooter} />}
        </MuiTableRow>
    );
};
