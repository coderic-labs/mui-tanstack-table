import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Table } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

/**
 * Context provider for sortable table columns.
 * Wrap the part of your table where you want to enable column sorting with this provider.
 * @param props
 * @returns
 */
export const TableSortableContextProvider = <T,>(props: PropsWithChildren<{ table: Table<T> }>) => {
    const { children, table } = props;
    const columnOrder = table.getState().columnOrder;

    return (
        <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
            {children}
        </SortableContext>
    );
}
