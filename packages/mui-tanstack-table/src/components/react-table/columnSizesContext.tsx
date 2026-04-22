import { Table as TanstackTable } from '@tanstack/react-table';
import { createContext, useContext, useMemo } from 'react';

export type ColumnSizesVars = Record<string, number>;

const def: ColumnSizesVars = {};

export const ColumnSizesContext = createContext<ColumnSizesVars>(def);

export const useColumnSizes = () => useContext(ColumnSizesContext);

export const useColumnSizesVars = <T,>(table: TanstackTable<T>) => {
    const columnSizingInfo = table.getState().columnSizingInfo;
    const columnSizing = table.getState().columnSizing;
    const columnVisibility = table.getState().columnVisibility;

    const columnSizeVars = useMemo(() => {
        const headers = table.getFlatHeaders()
        const colSizes: { [key: string]: number } = {}
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]!
            colSizes[`--header-${header.id}-size`] = header.getSize()
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
        }
        return colSizes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnSizingInfo, columnSizing, columnVisibility, table]);

    return { columnSizeVars };
}
