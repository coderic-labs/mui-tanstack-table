import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import { Table as TanstackTable } from '@tanstack/react-table';

export type PinnedOffsets = {
    left: Map<string, number>;
    right: Map<string, number>;
};

const EMPTY_OFFSETS: PinnedOffsets = { left: new Map(), right: new Map() };

export const PinnedOffsetsContext = createContext<PinnedOffsets>(EMPTY_OFFSETS);

export const usePinnedOffsets = () => useContext(PinnedOffsetsContext);

/**
 * Measures actual rendered header cell widths to compute accurate sticky offsets
 * for pinned columns. Uses `useLayoutEffect` so offsets are applied before the
 * browser paints, preventing any visible gap or flicker.
 *
 * This is needed because TanStack's `column.getStart('left')` relies on TanStack's
 * internal column `size` (default 150px), which does not match actual rendered widths
 * in an HTML table with `table-layout: auto`.
 */
export function usePinnedColumnOffsets<T>(table: TanstackTable<T>) {
    const headerRowRef = useRef<HTMLTableRowElement>(null);
    const [offsets, setOffsets] = useState<PinnedOffsets>(EMPTY_OFFSETS);

    const columnPinningKey = JSON.stringify(table.getState().columnPinning);
    const columnVisibilityKey = JSON.stringify(table.getState().columnVisibility);

    useLayoutEffect(() => {
        const measure = () => {
            const row = headerRowRef.current;
            if (!row) return;

            const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>('th'));
            const visibleCols = table.getVisibleLeafColumns();
            if (!visibleCols.length) return;

            // Map each visible column ID to its actual rendered pixel width
            const widthByColId = new Map<string, number>();
            visibleCols.forEach((col, i) => {
                widthByColId.set(col.id, cells[i]?.offsetWidth ?? 0);
            });

            // Left-pinned: cumulative offsets left-to-right
            const leftPinned = table.getLeftVisibleLeafColumns();
            const leftOffsets = new Map<string, number>();
            let leftCumulative = 0;
            for (const col of leftPinned) {
                leftOffsets.set(col.id, leftCumulative);
                leftCumulative += widthByColId.get(col.id) ?? 0;
            }

            // Right-pinned: cumulative offsets right-to-left
            const rightPinned = table.getRightVisibleLeafColumns();
            const rightOffsets = new Map<string, number>();
            let rightCumulative = 0;
            for (const col of [...rightPinned].reverse()) {
                rightOffsets.set(col.id, rightCumulative);
                rightCumulative += widthByColId.get(col.id) ?? 0;
            }

            setOffsets({ left: leftOffsets, right: rightOffsets });
        };

        measure();

        // Re-measure if column widths change (e.g. window resize, content change)
        const observer = new ResizeObserver(measure);
        const row = headerRowRef.current;
        if (row) observer.observe(row);

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnPinningKey, columnVisibilityKey]);

    return { headerRowRef, offsets };
}
