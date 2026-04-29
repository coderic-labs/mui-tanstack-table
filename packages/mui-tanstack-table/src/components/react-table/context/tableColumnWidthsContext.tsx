import isEqual from 'lodash/isEqual';
import { createContext, useCallback, useContext, useState } from 'react';
import { useElementWidths } from '../../../utils/useElementWidths';

export type ColumnWidths = Record<string, number>;

export type RegisterHeaderCell = (columnId: string, cell: HTMLTableCellElement | null) => void;

const EMPTY_WIDTHS: ColumnWidths = {};

const ColumnWidthsContext = createContext<ColumnWidths>(EMPTY_WIDTHS);

export type TableColumnWidthsContextProviderProps = {
    children: (registerHeaderCell: RegisterHeaderCell) => React.ReactNode;
}

/**
 * Provides column widths based on the widths of header cells.
 * The header cells need to be registered using the `registerHeaderCell` function provided.
 * @param props
 * @returns
 */
export const TableColumnWidthsContextProvider = (props: TableColumnWidthsContextProviderProps) => {
    const { children } = props;
    const { registerHeaderCell, widths } = useColumnWidthsObserver();
    return (
        <ColumnWidthsContext.Provider value={widths}>
            {children(registerHeaderCell)}
        </ColumnWidthsContext.Provider>
    );
}

export const useColumnWidths = () => useContext(ColumnWidthsContext);

const useColumnWidthsObserver = () => {
    const [headerCells, setHeaderCells] = useState<Map<string, HTMLTableCellElement>>(new Map());
    const widths = useElementWidths(headerCells);

    const registerHeaderCell = useCallback<RegisterHeaderCell>((columnId, cell) => {
        setHeaderCells((prev) => {
            const next = new Map(prev);
            if (cell) next.set(columnId, cell);
            return isEqual(prev, next) ? prev : next;
        });
    }, [setHeaderCells]);

    return { registerHeaderCell, widths };
}
