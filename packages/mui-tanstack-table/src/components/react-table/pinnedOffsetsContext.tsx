import { createContext, useContext, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';

export type PinnedOffsets = {
    left: Map<string, number>;
    right: Map<string, number>;
};

const EMPTY_OFFSETS: PinnedOffsets = { left: new Map(), right: new Map() };

export const PinnedOffsetsContext = createContext<PinnedOffsets>(EMPTY_OFFSETS);

export const usePinnedOffsets = () => useContext(PinnedOffsetsContext);

/**
 * Measures actual rendered header cell widths and positions to compute accurate sticky offsets
 * for pinned columns. Uses ResizeObserver to detect layout changes.
 *
 * This approach measures actual DOM positions rather than calculating cumulative offsets,
 * ensuring accuracy even when columns are dynamically pinned/unpinned.
 */
export function usePinnedColumnOffsets<T>(table: TanstackTable<T>) {
    const headerRowRef = useRef<HTMLTableRowElement>(null);
    const [offsets, setOffsets] = useState<PinnedOffsets>(EMPTY_OFFSETS);
    const measureTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const measure = useCallback(() => {
        // Debounce rapid measurements
        if (measureTimeoutRef.current) {
            clearTimeout(measureTimeoutRef.current);
        }

        measureTimeoutRef.current = setTimeout(() => {
            const row = headerRowRef.current;
            if (!row) return;

            const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>('th'));
            if (!cells.length) return;

            const leftOffsets = new Map<string, number>();
            const rightOffsets = new Map<string, number>();

            // Track cumulative positions for left and right pinned columns
            let leftPos = 0;
            let rightPos = 0;

            // First pass: identify and measure all pinned columns in DOM order
            const leftPinnedCols: Array<{ id: string; width: number }> = [];
            const rightPinnedCols: Array<{ id: string; width: number }> = [];

            cells.forEach((cell) => {
                // Extract column ID from data-testid (format: "mtt-table-header-cell.{columnId}")
                const testId = cell.getAttribute('data-testid');
                if (!testId) return;

                const colId = testId.split('.').pop();
                if (!colId) return;

                const col = table.getColumn(colId);
                if (!col) return;

                const isPinned = col.getIsPinned();
                const width = cell.offsetWidth;

                if (isPinned === 'left') {
                    leftPinnedCols.push({ id: colId, width });
                } else if (isPinned === 'right') {
                    rightPinnedCols.push({ id: colId, width });
                }
            });

            // Calculate left offsets (left-to-right)
            for (const { id, width } of leftPinnedCols) {
                leftOffsets.set(id, leftPos);
                leftPos += width;
            }

            // Calculate right offsets (right-to-left, reverse iteration)
            for (let i = rightPinnedCols.length - 1; i >= 0; i--) {
                const { id, width } = rightPinnedCols[i];
                rightOffsets.set(id, rightPos);
                rightPos += width;
            }

            console.log('Left offsets:', Array.from(leftOffsets.entries()));
            console.log('Right offsets:', Array.from(rightOffsets.entries()));

            setOffsets({ left: leftOffsets, right: rightOffsets });
        }, 0); // Use 0 timeout to batch rapid measurements in same frame
    }, [table, table.getState().columnPinning]);

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
            if (measureTimeoutRef.current) {
                clearTimeout(measureTimeoutRef.current);
            }
        };
    }, [measure]);

    return { headerRowRef, offsets };
}
