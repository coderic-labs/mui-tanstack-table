import { Theme, darken, lighten } from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Column, ColumnPinningPosition } from '@tanstack/react-table';

export type GetCellStyleOptions<T> = {
	/**
	 * column definition
	 */
	column: Column<T>;
	/**
	 * table section where the cell is rendered
	 */
	area?: 'header' | 'body' | 'footer';
	/**
	 * alternating row background for body cells
	 */
	even?: boolean;
	/**
	 * applies sticky behavior for header/footer areas
	 */
	sticky?: boolean;
};

export const getCellStyle = <T,>(opts: GetCellStyleOptions<T>): SystemStyleObject<Theme> => {
	const {
		column,
		area = 'body',
		even = false,
		sticky = false,
	} = opts;
	
	const pinnedPosition = column.getIsPinned();
	const isHeader = area === 'header';
	const isFooter = area === 'footer';

	const styles: SystemStyleObject<Theme> = {
		background: theme =>
			even ? getEvenRowColor(theme) : theme.palette.background.paper
	};

	if (pinnedPosition) {
		styles.position = 'sticky';
		styles.zIndex = isHeader ? 3 : 1;
		styles.left = pinnedPosition === 'left' ? 0 : undefined;
		styles.right = pinnedPosition === 'right' ? 0 : undefined;
		styles.boxShadow = getPinnedShadow(pinnedPosition);
	}

	if (sticky && (isHeader || isFooter)) {
		styles.position = 'sticky !important';
		styles.background = theme => theme.palette.background.paper;
	}

	if (sticky && isFooter) {
		styles.bottom = 0;
	}

	return styles;
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
