import { Table as MuiTable, TableProps as MuiTableProps, TableBody, TableFooter, TableHead } from '@mui/material';
import { Table as TanstackTable } from '@tanstack/react-table';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useColumnSizesVars } from './columnSizesContext';
import { ColumnWidthsContext, useColumnWidthsObserver } from './columnWidthsContext';
import { TableDndContext } from './tableDndContext';
import { TableBodyRow } from './rows/tableBodyRow';
import { TableEmptyRow } from './rows/tableEmptyRow';
import { TableFooterRow } from './rows/tableFooterRow';
import { TableHeaderRow } from './rows/tableHeaderRow';
import type { GetRowStyle, RowDetailComponent } from './types';

export type TableProps<T> = MuiTableProps & {
    table: TanstackTable<T>;
    rowDetail?: RowDetailComponent<T>;
    getRowStyle?: GetRowStyle<T>;
    stickyFooter?: boolean;
    tableLayout?: 'auto' | 'fixed';
};

export function Table<T>(props: TableProps<T>) {
    const { table, rowDetail, getRowStyle, stickyFooter, tableLayout = 'auto', ...tableProps } = props;
    const showFooter = table.getAllColumns().some(c => c.getIsVisible() && c.columnDef.footer);

    const columnOrder = table.getState().columnOrder;
    const { registerHeaderCell, widths } = useColumnWidthsObserver();
    const { columnSizeVars } = useColumnSizesVars(table);

    return (
        <TableDndContext table={table}>
            <ColumnWidthsContext.Provider value={widths}>
                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                    <MuiTable
                        {...getDataTestAttrs(dataTests.table.root)}
                        {...tableProps}
                        sx={{ borderCollapse: 'separate', tableLayout, ...tableProps.sx }}
                        style={{ ...columnSizeVars }}>
                        <TableHead {...getDataTestAttrs(dataTests.table.head)}>
                            {table.getHeaderGroups().map((headerGroup, headerGroupIndex) =>
                                <TableHeaderRow
                                    key={headerGroup.id}
                                    headerGroup={headerGroup}
                                    stickyHeader={tableProps.stickyHeader}
                                    tableLayout={tableLayout}
                                    registerHeaderCell={registerHeaderCell}
                                    headerGroupIndex={headerGroupIndex}
                                />
                            )}
                        </TableHead>
                        <TableBody {...getDataTestAttrs(dataTests.table.body)}>
                            {table.getRowModel().rows.map(row =>
                                <TableBodyRow
                                    key={row.id}
                                    row={row}
                                    rowDetail={rowDetail}
                                    getRowStyle={getRowStyle}
                                    tableLayout={tableLayout}
                                />
                            )}
                            {!table.getRowModel().rows.length &&
                            <TableEmptyRow table={table} tableLayout={tableLayout} />}
                        </TableBody>
                        {showFooter &&
                        <TableFooter {...getDataTestAttrs(dataTests.table.footer)}>
                            {table.getFooterGroups().map((footerGroup, footerGroupIndex) =>
                                <TableFooterRow
                                    key={footerGroup.id}
                                    footerGroup={footerGroup}
                                    stickyFooter={stickyFooter}
                                    tableLayout={tableLayout}
                                    footerGroupIndex={footerGroupIndex}
                                />
                            )}
                        </TableFooter>
                        }
                    </MuiTable>
                </SortableContext>
            </ColumnWidthsContext.Provider>
        </TableDndContext>
    );
}
