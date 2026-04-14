import type { Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import type { Cell, Row } from '@tanstack/react-table';
import type { ReactElement } from 'react';

export type RowDetailComponent<T> = (props: { row: Row<T> }) => ReactElement;
export type StyleValue = SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);
export type GetRowStyle<T> = (row: Row<T>) => StyleValue | undefined;
export type GetCellStyle<T> = (cell: Cell<T, unknown>) => StyleValue | undefined;
