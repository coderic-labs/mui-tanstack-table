import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { Column, Table as TanstackTable } from '@tanstack/react-table';
import { ReactNode } from 'react';

/**
 * TableDndContext component wraps DndContext and manages drag handler for column reordering and pinning.
 * Passes DnD props to children via render prop.
 */
export function TableDndContextProvider<T>({ table, children }: { table: TanstackTable<T>; children: ReactNode; }) {
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
    );

    const columnOrder = table.getState().columnOrder;

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            // reorder columns after drag & drop
            const oldIndex = columnOrder.indexOf(active.id as string);
            const newIndex = columnOrder.indexOf(over.id as string);
            const newColumnOrder = arrayMove(columnOrder, oldIndex, newIndex);
            table.setColumnOrder(newColumnOrder);
            // update column pinning based on new order
            const overColumn = table.getColumn(over.id as string) as Column<T, unknown>;
            const activeColumn = table.getColumn(active.id as string) as Column<T, unknown>;
            const isOverPinned = overColumn.getIsPinned();
            if (activeColumn.getCanPin()) activeColumn.pin(isOverPinned)
            // update pinned columns to match the new order
            table.setColumnPinning(({ left = [], right = [] }) => ({
                left: newColumnOrder.filter((header) => left.includes(header)),
                right: newColumnOrder.filter((header) => right.includes(header)),
            }));
        }
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}>
            {children}
        </DndContext>
    );
}
