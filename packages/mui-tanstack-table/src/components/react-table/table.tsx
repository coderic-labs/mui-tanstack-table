import { Table as MuiTable, TableProps as MuiTableProps, TableBody, TableFooter, TableHead } from '@mui/material';
import { Table as TanstackTable } from '@tanstack/react-table';
import { Fragment } from 'react';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { TableSortableContextProvider } from './context';
import { TableColumnWidthsContextProvider } from './context/tableColumnWidthsContext';
import { TableDndContextProvider } from './context/tableDndContext';
import { TableBodyRow } from './rows/tableBodyRow';
import { TableDetailRow } from './rows/tableDetailRow';
import { TableEmptyRow } from './rows/tableEmptyRow';
import { TableFooterRow } from './rows/tableFooterRow';
import { TableHeaderRow } from './rows/tableHeaderRow';
import type { GetRowStyle, RowDetailComponent } from './types';
import { useColumnSizesVars } from './useColumnSizeVars';

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
    const { columnSizeVars } = useColumnSizesVars(table);

    return (
        <TableDndContextProvider table={table}>
            <TableSortableContextProvider table={table}>
                <TableColumnWidthsContextProvider>
                    {registerHeaderCell => (
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
                                    <Fragment key={row.id}>
                                        <TableBodyRow
                                            row={row}
                                            getRowStyle={getRowStyle}
                                            tableLayout={tableLayout}
                                        />
                                        {row.getIsExpanded() && rowDetail &&
                                            <TableDetailRow
                                                row={row}
                                                rowDetail={rowDetail}
                                                tableLayout={tableLayout} />}
                                    </Fragment>
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
                    )}
                </TableColumnWidthsContextProvider>
            </TableSortableContextProvider>
        </TableDndContextProvider>
    );
}
