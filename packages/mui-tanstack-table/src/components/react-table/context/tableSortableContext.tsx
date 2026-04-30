import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Table } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

/**
 * Provides sortable column context for the table.
 * Wrap the table section that needs column drag-and-drop ordering.
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
