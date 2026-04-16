import { Theme, darken, lighten } from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Column, ColumnPinningPosition } from '@tanstack/react-table';
import { PinnedOffsets, usePinnedOffsets } from './pinnedOffsetsContext';

export const useBodyCellStyle = <T,>(column: Column<T>, even?: boolean) => {
    const offsets = usePinnedOffsets();

    let styles: SystemStyleObject<Theme> = {
        background: theme => even ? getEvenRowColor(theme) : theme.palette.background.paper
    };

    styles = { ...styles, ...getPinnedCellStyle(column, offsets, 1) };

    return styles;
};

export const useHeaderCellStyle = <T,>(column: Column<T>, sticky?: boolean) => {
    const offsets = usePinnedOffsets();

    let styles: SystemStyleObject<Theme> = {
        background: theme => theme.palette.background.paper,
        verticalAlign: 'top'
    };

    if (sticky) {
        styles.position = 'sticky';
        styles.zIndex = 2;
        styles.top = 0;
    }

    styles = { ...styles, ...getPinnedCellStyle(column, offsets, 3) };

    return styles;
};

export const useFooterCellStyle = <T,>(column: Column<T>, sticky?: boolean) => {
    const offsets = usePinnedOffsets();

    let styles: SystemStyleObject<Theme> = {
        background: theme => theme.palette.background.paper
    };

    if (sticky) {
        styles.position = 'sticky';
        styles.zIndex = 2;
        styles.bottom = 0;
    }

    styles = { ...styles, ...getPinnedCellStyle(column, offsets, 3) };

    return styles;
};

export const getPinnedCellStyle = <T,>(column: Column<T, unknown>, offsets: PinnedOffsets, zIndex: number): SystemStyleObject<Theme> => {
    const pinnedPosition = column.getIsPinned();

    if (!pinnedPosition) return {};

    const isBoundary =
        (pinnedPosition === 'left' && column.getIsLastColumn('left')) ||
        (pinnedPosition === 'right' && column.getIsFirstColumn('right'));

    return {
        position: 'sticky',
        zIndex,
        left: pinnedPosition === 'left' ? `${offsets.left.get(column.id)}px` : undefined,
        right: pinnedPosition === 'right' ? `${offsets.right.get(column.id)}px` : undefined,
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
