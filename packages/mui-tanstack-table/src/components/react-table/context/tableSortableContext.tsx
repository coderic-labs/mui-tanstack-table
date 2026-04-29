import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Table } from "@tanstack/react-table";
import { PropsWithChildren } from "react";

export const TableSortableContextProvider = <T,>(props: PropsWithChildren<{ table: Table<T> }>) => {
    const { children, table } = props;
    const columnOrder = table.getState().columnOrder;

    return (
        <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
            {children}
        </SortableContext>
    );
}
