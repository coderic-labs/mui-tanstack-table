import { Theme, darken, lighten, useTheme } from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Column, ColumnPinningPosition, Table as TanstackTable } from '@tanstack/react-table';
import { getLeftOffset, getRightOffset } from '../../utils/pinning';
import { ColumnWidths, useColumnWidths } from './columnWidthsContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, useMemo } from 'react';

export const useBodyCellStyle = <T,>(column: Column<T>, table: TanstackTable<T>, even?: boolean) => {
    const widths = useColumnWidths();

    let styles: SystemStyleObject<Theme> = {
        background: theme => even ? getEvenRowColor(theme) : theme.palette.background.paper,
        position: 'relative'
    };

    styles = { ...styles, ...getPinnedCellStyle(column, table, widths, 1) };

    return styles;
};

export const useHeaderCellStyle = <T,>(column: Column<T>, table: TanstackTable<T>, sticky?: boolean) => {
    const widths = useColumnWidths();

    let styles: SystemStyleObject<Theme> = {
        background: theme => theme.palette.background.paper,
        verticalAlign: 'top',
        position: 'relative'
    };

    if (sticky) {
        styles.position = 'sticky';
        styles.zIndex = 2;
        styles.top = 0;
    }

    styles = { ...styles, ...getPinnedCellStyle(column, table, widths, 3) };

    return styles;
};

export const useFooterCellStyle = <T,>(column: Column<T>, table: TanstackTable<T>, sticky?: boolean) => {
    const widths = useColumnWidths();

    let styles: SystemStyleObject<Theme> = {
        background: theme => theme.palette.background.paper,
        position: 'relative'
    };

    if (sticky) {
        styles.position = 'sticky';
        styles.zIndex = 2;
        styles.bottom = 0;
    }

    styles = { ...styles, ...getPinnedCellStyle(column, table, widths, 3) };

    return styles;
};

export const useDraggingStyles = (columnId: string, dragZIndex: number) => {
    const { isDragging, transform, setNodeRef } = useSortable({ id: columnId });
    const theme = useTheme();

    const draggingStyles = useMemo((): CSSProperties => ({
        borderLeftStyle: isDragging ? 'dashed' : undefined,
        borderRightStyle: isDragging ? 'dashed' : undefined,
        borderLeftColor: isDragging ? theme.palette.secondary.main : undefined,
        borderLeftWidth: isDragging ? 1 : undefined,
        borderRightColor: isDragging ? theme.palette.secondary.main : undefined,
        borderRightWidth: isDragging ? 1 : undefined,
        transform: `translateX(${transform?.x ?? 0}px)`,
        zIndex: isDragging ? dragZIndex : undefined,
    }), [isDragging, transform, dragZIndex, theme]);

    return { draggingStyles, setNodeRef };
};

export const getPinnedCellStyle = <T,>(column: Column<T, unknown>, table: TanstackTable<T>, widths: ColumnWidths, zIndex: number): SystemStyleObject<Theme> => {
    const pinnedPosition = column.getIsPinned();

    if (!pinnedPosition) return {};

    const left = pinnedPosition === 'left'
        ? `${getLeftOffset(column, table, widths)}px`
        : undefined;

    const right = pinnedPosition === 'right'
        ? `${getRightOffset(column, table, widths)}px`
        : undefined;

    const isBoundary =
        (pinnedPosition === 'left' && column.getIsLastColumn('left')) ||
        (pinnedPosition === 'right' && column.getIsFirstColumn('right'));

    return {
        position: 'sticky',
        zIndex,
        left,
        right,
        boxShadow: isBoundary ? getPinnedShadow(pinnedPosition) : undefined
    };
};

export const getPinnedShadow = (pinned: ColumnPinningPosition) => {
    if (pinned === 'left')
        return '4px 0 4px -4px rgba(0,0,0,0.1)';
    if (pinned === 'right')
        return '-4px 0 4px -4px rgba(0,0,0,0.1)';
    return undefined;
};

export const getEvenRowColor = (theme: Theme) => {
    if (theme.palette.mode === 'light')
        return darken(theme.palette.background.paper, 0.03);
    if (theme.palette.mode === 'dark')
        return lighten(theme.palette.background.paper, 0.03);
    return theme.palette.background.paper;
};
