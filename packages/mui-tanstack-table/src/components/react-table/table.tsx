import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Table as MuiTable, TableProps as MuiTableProps, TableRow as MuiTableRow, TableBody, TableFooter, TableHead } from '@mui/material';
import { Cell, Table as TanstackTable } from '@tanstack/react-table';
import { Fragment } from 'react';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useColumnSizesVars } from './columnSizesContext';
import { ColumnWidthsContext, useColumnWidthsObserver } from './columnWidthsContext';
import { TableBodyCell, TableFooterCell, TableHeaderCell } from './tableCell';
import { TableDndContext } from './tableDndContext';
import { TableDetailRow, TableEmptyRow } from './tableRow';
import type { GetCellStyle, RowDetailComponent } from './types';

export type TableProps<T> = MuiTableProps & {
    table: TanstackTable<T>;
    rowDetail?: RowDetailComponent<T>;
    getCellStyle?: GetCellStyle<T>;
    stickyFooter?: boolean;
    /**
     * The CSS `table-layout` property of the table. Defaults to `auto`.
     * auto - The column width is determined by the content of the cells. This is the default behavior of HTML tables.
     * fixed - The column width is determined by tanstack columnWidths state.
     */
    tableLayout?: 'auto' | 'fixed';
};

export function Table<T>(props: TableProps<T>) {
    const { table, rowDetail, getCellStyle, stickyFooter, tableLayout = 'auto', ...tableProps } = props;
    const showFooter = table.getAllColumns().some(c => c.getIsVisible() && c.columnDef.footer);

    const { registerHeaderCell, widths } = useColumnWidthsObserver();
    const { columnSizeVars } = useColumnSizesVars(table);

    const headerGroups = table.getHeaderGroups();
    const columnOrder = table.getState().columnOrder;

    return (
        <TableDndContext table={table}>
            <ColumnWidthsContext.Provider value={widths}>
                <MuiTable
                    {...getDataTestAttrs(dataTests.table.root)}
                    {...tableProps}
                    sx={{ borderCollapse: 'separate', tableLayout, ...tableProps.sx, ...columnSizeVars }}>
                    <TableHead {...getDataTestAttrs(dataTests.table.head)}>
                        {headerGroups.map((headerGroup, headerGroupIndex) => (
                            <MuiTableRow
                                key={headerGroup.id}
                                {...getDataTestAttrs(dataTests.table.headerRow, headerGroupIndex + 1)}>
                                <SortableContext
                                    items={columnOrder}
                                    strategy={horizontalListSortingStrategy}>
                                    {headerGroup.headers.map((header) =>
                                        <TableHeaderCell
                                            key={header.id}
                                            tableCellRef={el => registerHeaderCell(header.column.id, el)}
                                            header={header}
                                            stickyHeader={tableProps.stickyHeader}
                                            tableLayout={tableLayout}
                                        />
                                    )}
                                </SortableContext>
                            </MuiTableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getDataTestAttrs(dataTests.table.body)}>
                        {table.getRowModel().rows.map(row =>
                            <Fragment key={row.id}>
                                <MuiTableRow {...getDataTestAttrs(dataTests.table.dataRow, row.id)}>
                                    {row.getVisibleCells().map((cell: Cell<T, unknown>) =>
                                        <SortableContext
                                            key={cell.id}
                                            items={columnOrder}
                                            strategy={horizontalListSortingStrategy}>
                                            <TableBodyCell
                                                key={cell.id}
                                                cell={cell}
                                                row={row}
                                                getCellStyle={getCellStyle}
                                            />
                                        </SortableContext>
                                    )}
                                </MuiTableRow>
                                {row.getIsExpanded() && rowDetail && <TableDetailRow row={row} rowDetail={rowDetail} />}
                            </Fragment>
                        )}
                        {!table.getRowModel().rows.length &&
                            <TableEmptyRow table={table} />}
                    </TableBody>
                    {showFooter &&
                        <TableFooter {...getDataTestAttrs(dataTests.table.footer)}>
                            {table.getFooterGroups().map((footerGroup, footerGroupIndex) => (
                                <MuiTableRow key={footerGroup.id} {...getDataTestAttrs(dataTests.table.footerRow, footerGroupIndex + 1)}>
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
                                </MuiTableRow>
                            ))}
                        </TableFooter>
                    }
                </MuiTable>
            </ColumnWidthsContext.Provider>
        </TableDndContext>
    );
}
