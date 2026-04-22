import { Table as TanstackTable } from '@tanstack/react-table';
import { createContext, useContext, useMemo } from 'react';

export type ColumnSizesVars = Record<string, number>;

const def: ColumnSizesVars = {};

export const ColumnSizesContext = createContext<ColumnSizesVars>(def);

export const useColumnSizes = () => useContext(ColumnSizesContext);

export const useColumnSizesVars = <T,>(table: TanstackTable<T>) => {
    const columnSizeVars = useMemo(() => {
        const headers = table.getFlatHeaders()
        const colSizes: { [key: string]: number } = {}
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]!
            colSizes[`--header-${header.id}-size`] = header.getSize()
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
        }
        return colSizes
    }, [table.getState().columnSizingInfo, table.getState().columnSizing]);
    return { columnSizeVars };
}
