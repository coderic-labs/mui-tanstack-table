import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Table as MuiTable, TableProps as MuiTableProps, TableRow as MuiTableRow, TableBody, TableFooter, TableHead } from '@mui/material';
import { Cell, Column, Table as TanstackTable } from '@tanstack/react-table';
import { Fragment } from 'react';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { ColumnWidthsContext, useColumnWidthsObserver } from './columnWidthsContext';
import { TableBodyCell, TableFooterCell, TableHeaderCell } from './tableCell';
import { TableDetailRow, TableEmptyRow } from './tableRow';
import type { GetCellStyle, RowDetailComponent } from './types';

export type TableProps<T> = MuiTableProps & {
    table: TanstackTable<T>;
    rowDetail?: RowDetailComponent<T>;
    getCellStyle?: GetCellStyle<T>;
    stickyFooter?: boolean;
};

export function Table<T>(props: TableProps<T>) {
    const { table, rowDetail, getCellStyle, stickyFooter, ...tableProps } = props;
    const showFooter = table.getAllColumns().some(c => c.getIsVisible() && c.columnDef.footer);
    const { registerHeaderCell, widths } = useColumnWidthsObserver();
    const headerGroups = table.getHeaderGroups();

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            // reorder columns after drag & drop
            const columnOrder = table.getState().columnOrder;
            const oldIndex = columnOrder.indexOf(active.id as string);
            const newIndex = columnOrder.indexOf(over.id as string);
            const newColumnOrder = arrayMove(columnOrder, oldIndex, newIndex);
            table.setColumnOrder(newColumnOrder);
            // update column pinning based on new order
            const overColumn = table.getColumn(over.id as string) as Column<T, unknown>;
            const activeColumn = table.getColumn(active.id as string) as Column<T, unknown>;
            const isOverPinned = overColumn.getIsPinned();
            activeColumn.pin(isOverPinned)
            // update pinned columns to match the new order
            table.setColumnPinning(({ left = [], right = [] }) => ({
                left: newColumnOrder.filter((header) => left.includes(header)),
                right: newColumnOrder.filter((header) => right.includes(header)),
            }));
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
    )

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <ColumnWidthsContext.Provider value={widths}>
                <MuiTable {...getDataTestAttrs(dataTests.table.root)} {...tableProps} sx={{ borderCollapse: 'separate', ...tableProps.sx }}>
                    <TableHead {...getDataTestAttrs(dataTests.table.head)}>
                        {headerGroups.map((headerGroup, headerGroupIndex) => (
                            <MuiTableRow
                                key={headerGroup.id}
                                {...getDataTestAttrs(dataTests.table.headerRow, headerGroupIndex + 1)}>
                                <SortableContext
                                    items={table.getState().columnOrder}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    {headerGroup.headers.map((header) =>
                                        <TableHeaderCell
                                            key={header.id}
                                            tableCellRef={el => registerHeaderCell(header.column.id, el)}
                                            header={header}
                                            stickyHeader={tableProps.stickyHeader}
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
                                        <TableBodyCell
                                            key={cell.id}
                                            cell={cell}
                                            row={row}
                                            getCellStyle={getCellStyle}
                                        />
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
                                        <TableFooterCell
                                            key={header.id}
                                            header={header}
                                            stickyFooter={stickyFooter}
                                        />
                                    )}
                                </MuiTableRow>
                            ))}
                        </TableFooter>
                    }
                </MuiTable>
            </ColumnWidthsContext.Provider>
        </DndContext>
    );
}
