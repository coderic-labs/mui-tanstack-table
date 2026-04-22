import type { Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';
import type { Row } from '@tanstack/react-table';
import type { ReactElement } from 'react';

export type RowDetailComponent<T> = (props: { row: Row<T> }) => ReactElement;
export type StyleValue = SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);
export type GetRowStyle<T> = (cell: Row<T>) => StyleValue | undefined;
