import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import isEqual from "lodash/isEqual";

export type ColumnWidths = Record<string, number>;

const EMPTY_WIDTHS: ColumnWidths = {};

export const ColumnWidthsContext = createContext<ColumnWidths>(EMPTY_WIDTHS);

export const useColumnWidths = () => useContext(ColumnWidthsContext);

type HeaderCellWidth = {
    id: string;
    width: number;
};

const collectHeaderCellWidths = (
    headerCells: Map<string, HTMLTableCellElement>
): HeaderCellWidth[] => {
    const cellWidths: HeaderCellWidth[] = [];

    headerCells.forEach((cell, id) => {
        cellWidths.push({ id, width: cell.offsetWidth });
    });

    return cellWidths;
};

const buildColumnWidths = (cellWidths: HeaderCellWidth[]): ColumnWidths => {
    const widths: ColumnWidths = {};
    for (const cell of cellWidths) {
        widths[cell.id] = cell.width;
    }
    return widths;
};

const areWidthsEqual = (prev: ColumnWidths, next: ColumnWidths) => {
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);
    if (prevKeys.length !== nextKeys.length) return false;
    return prevKeys.every(id => prev[id] === next[id]);
};

/**
 * Measures actual rendered widths of header cells.
 */
export function useColumnWidthsObserver() {
    const [widths, setWidths] = useState<ColumnWidths>(EMPTY_WIDTHS);
    const [headerCells, setHeaderCells] = useState<Map<string, HTMLTableCellElement>>(new Map());
    const frameRef = useRef<number>();

    const measure = useCallback(() => {
        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        frameRef.current = requestAnimationFrame(() => {
            const cellWidths = collectHeaderCellWidths(headerCells);
            const next = buildColumnWidths(cellWidths);

            setWidths(prev => areWidthsEqual(prev, next) ? prev : next);
        });
    }, [headerCells]);

    const registerHeaderCell = useCallback((columnId: string, cell: HTMLTableCellElement | null) => {
        setHeaderCells((prev) => {
            const next = new Map(prev);
            if (cell) next.set(columnId, cell);
            return isEqual(prev, next) ? prev : next;
        });
    }, [setHeaderCells]);

    useLayoutEffect(() => {
        measure();

        const observer = new ResizeObserver(() => {
            measure();
        });

        headerCells.forEach(cell => observer.observe(cell));

        return () => {
            observer.disconnect();
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [headerCells, measure]);

    return { registerHeaderCell, widths };
}
