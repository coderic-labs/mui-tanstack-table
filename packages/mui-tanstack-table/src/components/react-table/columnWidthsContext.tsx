import { createContext, useCallback, useContext, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useElementWidths } from '../../utils/useElementWidths';

export type ColumnWidths = Record<string, number>;

const EMPTY_WIDTHS: ColumnWidths = {};

export const ColumnWidthsContext = createContext<ColumnWidths>(EMPTY_WIDTHS);

export const useColumnWidths = () => useContext(ColumnWidthsContext);

export function useColumnWidthsObserver() {
    const [headerCells, setHeaderCells] = useState<Map<string, HTMLTableCellElement>>(new Map());
    const widths = useElementWidths(headerCells);

    const registerHeaderCell = useCallback((columnId: string, cell: HTMLTableCellElement | null) => {
        setHeaderCells((prev) => {
            const next = new Map(prev);
            if (cell) next.set(columnId, cell);
            return isEqual(prev, next) ? prev : next;
        });
    }, [setHeaderCells]);

    return { registerHeaderCell, widths };
}
