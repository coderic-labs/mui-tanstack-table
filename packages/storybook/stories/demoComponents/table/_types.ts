import { ReactTableProps } from '@coderic/mui-tanstack-table';
import { Developer } from './_data';

export type DemoTableProps = Omit<ReactTableProps<Developer>, 'table'> & {
	enableMultiSort?: boolean;
	maxMultiSortColCount?: number,
}