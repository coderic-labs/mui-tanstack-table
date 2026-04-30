import type { Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';
import type { Row } from '@tanstack/react-table';
import type { ReactElement } from 'react';

/** Render function for an expanded row's detail panel. Receives the TanStack `Row` instance. */
export type RowDetailComponent<T> = (props: { row: Row<T> }) => ReactElement;

/** A MUI `sx`-compatible style value — either a plain `SystemStyleObject` or a theme callback. */
export type StyleValue = SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);

/**
 * Per-row style resolver passed to `<Table>`.
 * Return a {@link StyleValue} to apply custom `sx` styles to a row, or `undefined` for defaults.
 */
export type GetRowStyle<T> = (cell: Row<T>) => StyleValue | undefined;
