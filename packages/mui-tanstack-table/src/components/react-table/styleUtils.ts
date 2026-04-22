import { useSortable } from '@dnd-kit/sortable';
import { Theme, alpha, useTheme } from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Column, ColumnPinningPosition, Header, Table as TanstackTable } from '@tanstack/react-table';
import { CSSProperties, useMemo } from 'react';
import { getLeftOffset, getRightOffset } from '../../utils/pinning';
import { ColumnWidths, useColumnWidths } from './columnWidthsContext';

export const useBodyCellStyle = <T,>(column: Column<T>, table: TanstackTable<T>) => {
    const widths = useColumnWidths();

    let styles: SystemStyleObject<Theme> = {
        backgroundColor: `var(--rowcolor)`,
        position: 'relative',
        width: `calc(var(--col-${column.id}-size) * 1px)`,
        overflow: 'hidden',
    };

    styles = { ...styles, ...getPinnedCellStyle(column, table, widths, 1) };

    return styles;
};

export const useHeaderCellStyle = <T,>(header: Header<T, unknown>, table: TanstackTable<T>, sticky?: boolean) => {
    const widths = useColumnWidths();

    let styles: SystemStyleObject<Theme> = {
        backgroundColor: `var(--rowcolor)`,
        verticalAlign: 'top',
        position: 'relative',
        width: `calc(var(--header-${header?.id}-size) * 1px)`,
        overflow: 'hidden',
    };

    if (sticky) {
        styles.position = 'sticky';
        styles.zIndex = 2;
        styles.top = 0;
    }

    styles = { ...styles, ...getPinnedCellStyle(header.column, table, widths, 3) };

    return styles;
};

export const useFooterCellStyle = <T,>(column: Column<T>, table: TanstackTable<T>, sticky?: boolean) => {
    const widths = useColumnWidths();

    let styles: SystemStyleObject<Theme> = {
        backgroundColor: `var(--rowcolor)`,
        position: 'relative',
        overflow: 'hidden',
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
        backgroundImage: getPinnedCellBackground,
        boxShadow: isBoundary
            ? theme => getPinnedShadow(pinnedPosition, theme)
            : undefined
    };
};

export const getPinnedShadow = (pinned: ColumnPinningPosition, theme: Theme) => {
    if (pinned === 'left')
        return `-4px 0px 4px -4px ${theme.palette.divider} inset`;
    if (pinned === 'right')
        return `4px 0px 4px -4px ${theme.palette.divider} inset`;
    return undefined;
};

export const getPinnedCellBackground = (theme: Theme) => {
    const overlayColor = theme.palette.mode === 'dark' ? alpha('#fff', 0.03) : alpha('#000', 0.01);
    return `linear-gradient(${overlayColor}, ${overlayColor})`
};
