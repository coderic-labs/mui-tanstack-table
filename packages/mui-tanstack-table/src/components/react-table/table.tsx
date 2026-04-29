import { Table as MuiTable, TableProps as MuiTableProps, TableBody, TableFooter, TableHead } from '@mui/material';
import { Table as TanstackTable } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useColumnSizesVars } from './columnSizesContext';
import { ColumnWidthsContext, useColumnWidthsObserver } from './columnWidthsContext';
import { TableBodyRow } from './tableBodyRow';
import { TableDndContext } from './tableDndContext';
import { TableEmptyRow } from './tableEmptyRow';
import { TableFooterRow } from './tableFooterRow';
import { TableHeaderRow } from './tableHeaderRow';
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

    const { registerHeaderCell, widths } = useColumnWidthsObserver();
    const { columnSizeVars } = useColumnSizesVars(table);

    return (
        <TableDndContext table={table}>
            <ColumnWidthsContext.Provider value={widths}>
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
                                table={table}
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
                                table={table}
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
                                    table={table}
                                    stickyFooter={stickyFooter}
                                    tableLayout={tableLayout}
                                    footerGroupIndex={footerGroupIndex}
                                />
                            )}
                        </TableFooter>
                    }
                </MuiTable>
            </ColumnWidthsContext.Provider>
        </TableDndContext>
    );
}
