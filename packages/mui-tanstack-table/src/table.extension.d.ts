import { TableCellProps } from '@mui/material';
import { HeaderContext, ColumnDefTemplate, RowData } from '@tanstack/react-table';

// Extend the column definition
declare module '@tanstack/react-table' {

	interface ColumnDefBase<TData extends RowData, TValue = unknown> {
		filter?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
		tooltip?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
		title?: string;
		tableCellProps?: TableCellProps;
	}
	
}