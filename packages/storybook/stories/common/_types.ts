import { TableProps } from '@coderic-labs/mui-tanstack-table';
import { Developer } from './_data';

export type DemoTableProps = Omit<TableProps<Developer>, 'table'> & {
    enableMultiSort?: boolean;
    maxMultiSortColCount?: number,
    highlightRow?: string;
}