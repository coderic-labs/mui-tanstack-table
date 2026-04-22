import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Table as MuiTable, TableProps as MuiTableProps, TableRow as MuiTableRow, styled, TableBody, TableFooter, TableHead } from '@mui/material';
import { Cell, Table as TanstackTable } from '@tanstack/react-table';
import { Fragment } from 'react';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useColumnSizesVars } from './columnSizesContext';
import { ColumnWidthsContext, useColumnWidthsObserver } from './columnWidthsContext';
import { TableBodyCell, TableBodyFillerCell, TableFooterCell, TableFooterFillerCell, TableHeaderCell, TableHeaderFillerCell } from './tableCell';
import { TableDndContext } from './tableDndContext';
import { TableDetailRow, TableEmptyRow } from './tableRow';
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

    const headerGroups = table.getHeaderGroups();
    const columnOrder = table.getState().columnOrder;

    return (
        <TableDndContext table={table}>
            <ColumnWidthsContext.Provider value={widths}>
                <MuiTable
                    {...getDataTestAttrs(dataTests.table.root)}
                    {...tableProps}
                    sx={{ borderCollapse: 'separate', tableLayout, ...tableProps.sx }}
                    style={{ ...columnSizeVars }}>
                    <TableHead {...getDataTestAttrs(dataTests.table.head)}>
                        {headerGroups.map((headerGroup, headerGroupIndex) => (
                            <MuiTableRow
                                key={headerGroup.id}
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
                                            stickyHeader={tableProps.stickyHeader}
                                            tableLayout={tableLayout}
                                        />
                                    )}
                                </SortableContext>
                                {tableLayout === 'fixed' &&
                                    <TableHeaderFillerCell stickyHeader={tableProps.stickyHeader} />}
                            </MuiTableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getDataTestAttrs(dataTests.table.body)}>
                        {table.getRowModel().rows.map(row =>
                            <Fragment key={row.id}>
                                <HeaderRowStyled
                                    {...getDataTestAttrs(dataTests.table.dataRow, row.id)}
                                    sx={getRowStyle ? getRowStyle(row) : undefined}>
                                    {row.getVisibleCells().map((cell: Cell<T, unknown>) =>
                                        <SortableContext
                                            key={cell.id}
                                            items={columnOrder}
                                            strategy={horizontalListSortingStrategy}>
                                            <TableBodyCell
                                                key={cell.id}
                                                cell={cell}
                                                row={row}
                                            />
                                        </SortableContext>
                                    )}
                                    {tableLayout === 'fixed' && <TableBodyFillerCell />}
                                </HeaderRowStyled>
                                {row.getIsExpanded() && rowDetail &&
                                    <TableDetailRow row={row} rowDetail={rowDetail} tableLayout={tableLayout} />}
                            </Fragment>
                        )}
                        {!table.getRowModel().rows.length &&
                            <TableEmptyRow table={table} tableLayout={tableLayout} />}
                    </TableBody>
                    {showFooter &&
                        <TableFooter {...getDataTestAttrs(dataTests.table.footer)}>
                            {table.getFooterGroups().map((footerGroup, footerGroupIndex) => (
                                <MuiTableRow
                                    key={footerGroup.id}
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
                            ))}
                        </TableFooter>
                    }
                </MuiTable>
            </ColumnWidthsContext.Provider>
        </TableDndContext>
    );
}

const HeaderRowStyled = styled(MuiTableRow)(({ theme }) => ({
    '--rowcolor': theme.palette.background.paper,
}));
