import { createContext, useContext, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';

export type ColumnWidths = Map<string, number>;

const EMPTY_WIDTHS: ColumnWidths = new Map();

export const ColumnWidthsContext = createContext<ColumnWidths>(EMPTY_WIDTHS);

export const useColumnWidths = () => useContext(ColumnWidthsContext);

type HeaderCellWidth = {
    id: string;
    width: number;
};

const getColumnIdFromHeaderCell = (cell: HTMLTableCellElement) => {
    const testId = cell.getAttribute('data-testid');
    if (!testId) return undefined;
    return testId.split('.').pop();
};

const collectHeaderCellWidths = <T,>(
    row: HTMLTableRowElement,
    table: TanstackTable<T>
): HeaderCellWidth[] => {
    const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>('th'));
    const cellWidths: HeaderCellWidth[] = [];

    cells.forEach((cell) => {
        const id = getColumnIdFromHeaderCell(cell);
        if (!id) return;

        const column = table.getColumn(id);
        if (!column) return;

        cellWidths.push({ id, width: cell.offsetWidth });
    });

    return cellWidths;
};

const buildColumnWidths = (cellWidths: HeaderCellWidth[]): ColumnWidths => {
    const widths = new Map<string, number>();
    for (const cell of cellWidths) {
        widths.set(cell.id, cell.width);
    }
    return widths;
};

const areWidthsEqual = (prev: ColumnWidths, next: ColumnWidths) => {
    if (prev.size !== next.size) {
        return false;
    }

    let isEqual = true;
    prev.forEach((value, id) => {
        if (next.get(id) !== value) {
            isEqual = false;
        }
    });

    if (!isEqual) return false;

    return true;
};

/**
 * Measures actual rendered widths of header cells.
 */
export function useColumnWidthsObserver<T>(table: TanstackTable<T>) {
    const headerRowRef = useRef<HTMLTableRowElement>(null);
    const [widths, setWidths] = useState<ColumnWidths>(EMPTY_WIDTHS);
    const frameRef = useRef<number>();

    const measure = useCallback(() => {
        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        frameRef.current = requestAnimationFrame(() => {
            const row = headerRowRef.current;
            if (!row) return;

            const cellWidths = collectHeaderCellWidths(row, table);
            const next = buildColumnWidths(cellWidths);

            setWidths(prev => areWidthsEqual(prev, next) ? prev : next);
        });
    }, [table]);

    useLayoutEffect(() => {
        // Initial measurement
        measure();

        // Observe header row for size changes
        const observer = new ResizeObserver(() => {
            measure();
        });

        const row = headerRowRef.current;
        if (row) {
            observer.observe(row);
            // Also observe individual cells to catch column width changes
            const cells = row.querySelectorAll('th');
            cells.forEach(cell => observer.observe(cell));
        }

        return () => {
            observer.disconnect();
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [measure]);

    return { headerRowRef, widths };
}
