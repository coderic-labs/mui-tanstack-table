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

/** Props for the root {@link Table} component. */
export type TableProps<T> = MuiTableProps & {
    table: TanstackTable<T>;
    /** Component rendered in an expanded detail row beneath a body row. */
    rowDetail?: RowDetailComponent<T>;
    /** Per-row `sx` style resolver. Return `undefined` to use default row styling. */
    getRowStyle?: GetRowStyle<T>;
    /** Pins the footer to the bottom of the scroll container. */
    stickyFooter?: boolean;
    /**
     * CSS `table-layout` value.
     * Use `"fixed"` when column resizing is enabled (required by the resize handler).
     * @default "auto"
     */
    tableLayout?: 'auto' | 'fixed';
};

/**
 * Root table component. Renders the full MUI `Table` head, body, and footer from the provided TanStack table instance.
 * Wrap in {@link TableLocalizationProvider} and MUI x-date-pickers `<LocalizationProvider>` as needed.
 */
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
