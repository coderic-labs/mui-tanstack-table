import { Column, Table as TanstackTable } from '@tanstack/react-table';
import { ColumnWidths } from '../components/react-table/context/tableColumnWidthsContext';

export const getLeftOffset = <T,>(column: Column<T, unknown>, table: TanstackTable<T>, widths: ColumnWidths) => {
    const leftPinned = table.getLeftVisibleLeafColumns();
    const currentIndex = leftPinned.findIndex(c => c.id === column.id);
    if (currentIndex < 0) return 0;

    let offset = 0;
    for (let i = 0; i < currentIndex; i++) {
        offset += widths[leftPinned[i].id] ?? 0;
    }
    return offset;
};

export const getRightOffset = <T,>(column: Column<T, unknown>, table: TanstackTable<T>, widths: ColumnWidths) => {
    const rightPinned = table.getRightVisibleLeafColumns();
    const currentIndex = rightPinned.findIndex(c => c.id === column.id);
    if (currentIndex < 0) return 0;

    let offset = 0;
    for (let i = currentIndex + 1; i < rightPinned.length; i++) {
        offset += widths[rightPinned[i].id] ?? 0;
    }
    return offset;
};
