import { Theme, darken, lighten } from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Column, ColumnPinningPosition } from '@tanstack/react-table';

export type getPinnedColumnStyleOpts<T, > = {
	/**
	 * column definition
	 */
	column: Column<T>,
	/**
	 * applies correct zIndex for header cells if true
	 */
	isHeading?: boolean,
	/**
	 * highlighted style if true
	 */
	highlight?: boolean,
	/**
	 * grey if true, white if false
	 * highlight takes precedence over this option
	 */
	even?: boolean
}

export const getPinnedColumnStyle = <T, >(opts: getPinnedColumnStyleOpts<T>): SystemStyleObject<Theme> => {
	const { column, isHeading = false, highlight = false, even = false } = opts;
	const isPinned = column.getIsPinned();

	let styles: SystemStyleObject<Theme> = {
		background: theme =>
			highlight ? theme.palette.primary.light :
				even ? getEvenRowColor(theme) : theme.palette.background.paper
	};

	if (isPinned) {
		styles = {
			...styles,
			position: 'sticky',
			zIndex: isHeading ? 3 : 1,
			left: isPinned === 'left' ? 0 : undefined,
			right: isPinned === 'right' ? 0 : undefined,
			boxShadow: getPinnedShadow(isPinned)
		};
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

export const getStickyHeaderStyle = (stickyHeader?: boolean): SystemStyleObject<Theme> => {
	if (!stickyHeader)
		return {};
	return {
		position: 'sticky !important',
		background: theme => theme.palette.background.paper
	};
};

export const getEvenRowColor = (theme: Theme) => {
	if (theme.palette.mode === 'light')		
		return darken(theme.palette.background.paper, 0.03);
	if (theme.palette.mode === 'dark')
		return lighten(theme.palette.background.paper, 0.03);
	return theme.palette.background.paper;
}
