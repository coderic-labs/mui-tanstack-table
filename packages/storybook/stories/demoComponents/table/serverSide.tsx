import {
	getTableMeta, makeMeta, predefinedColumnFilters, Table,
	TableBulkActionButton,
	TableColumnVisibilityToggle,
	TableHeader,
	TablePaginationV2,
	TableResultsLabel,
	TableToolbar,
	TableToolbarActions,
	TableToolbarInfo,
	TableRowExpansionCell, TableRowExpansionHeader, TableRowSelectionCell,
	TableRowSelectionHeader,
	TableBooleanCell,
	useConfirmDialog
} from '@coderic-labs/mui-tanstack-table';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Chip, IconButton, Paper, Stack, TableContainer } from '@mui/material';
import type { ColumnFiltersState, ColumnPinningState, OnChangeFn, PaginationState, SortingState } from '@tanstack/react-table';
import {
	createColumnHelper,
	getCoreRowModel,
	getExpandedRowModel,
	RowSelectionState,
	useReactTable
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { ConfirmDeleteDialog, employmentOptions, RowDetail, techOptions, verifiedLabels } from './_common';
import { Developer, useItems } from './_data';
import { DemoTableProps } from './_types';

type TableMeta = {
	showConfirmDialog: (items: Developer[]) => void;
}

const { BooleanFilter, DateRangeFilter, SelectFilter, TextFilter } = predefinedColumnFilters;

const columnHelper = createColumnHelper<Developer>();

const columns = [
	columnHelper.display({
		id: 'select',
		enableHiding: false,
		tableCellProps: { style: { minWidth: 'unset' } },
		header: (context) =>
			<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
				<TableRowExpansionHeader {...context} />
				<TableRowSelectionHeader {...context} />
			</Stack>,
		cell: (context) =>
			<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
				<TableRowExpansionCell {...context} />
				<TableRowSelectionCell {...context} />
			</Stack>
	}),
	columnHelper.accessor('id', {
		// render same content in header and footer
		header: TableHeader,
		footer: TableHeader
	}),
	columnHelper.accessor('name', {
		header: TableHeader,
		filter: TextFilter
	}),
	columnHelper.accessor('hireDate', {
		title: 'hire date',
		header: TableHeader,
		filter: DateRangeFilter,
		cell: ({ getValue }) => getValue().toDate().toLocaleDateString()
	}),
	columnHelper.accessor('employmentType', {
		title: 'employment type',
		header: TableHeader,
		filter: (context) => <SelectFilter {...context} options={employmentOptions} />
	}),
	columnHelper.accessor('technologies', {
		header: TableHeader,
		filter: (context) => <SelectFilter {...context} options={techOptions} selectProps={{ multiple: true }} />,
		cell: ({ getValue }) => <Stack direction='row' gap={1}>{getValue().map(x => <Chip size='small' key={x} label={x} />)}</Stack>,
		tooltip: 'Last updated 1.1.2025'
	}),
	columnHelper.accessor('projects', {
		header: TableHeader,
		filter: TextFilter,
		cell: ({ getValue }) => <Chip size='small' label={getValue()} />
	}),
	columnHelper.accessor('verified', {
		header: TableHeader,
		filter: (context) => <BooleanFilter {...context} labels={verifiedLabels} />,
		cell: TableBooleanCell
	}),
	columnHelper.display({
		id: 'actions',
		header: TableHeader,
		enableHiding: false,
		tableCellProps: { style: { minWidth: 'unset' } },
		cell: (cellContext) => {
			const { row, table } = cellContext;
			return (
				<Stack direction='row' gap={1}>
					<IconButton
						color="secondary"
						onClick={() => alert('edit: ' + JSON.stringify(row.original))}
					>
						<Edit />
					</IconButton>
					<IconButton
						color="error"
						onClick={() => getTableMeta<TableMeta>(table).showConfirmDialog([row.original])}
					>
						<Delete />
					</IconButton>
				</Stack>
			);
		}
	})
];

export const ServerSideTableDemo = (props: DemoTableProps) => {
	const { enableMultiSort, maxMultiSortColCount, ...baseTableProps } = props;

	// table state
	const {
		pagination, sorting, columnFilters, rowSelection, columnPinning,
		onColumnFiltersChange, onSortingChange, onPaginationChange, onColumnPinningChange, onRowSelectionChange
	} = useTableState();

	// data fetching
	const { data, totalCount, deleteItems } = useItems({ columnFilters, sorting, pagination });

	// confirm delete dialog
	const { showConfirmDialog, confirmDialog } = useConfirmDialog({
		Component: ConfirmDeleteDialog,
		onConfirm: (items) => deleteItems(items.map(item => item.id))
	});

	const table = useReactTable<Developer>({
		columns,
		data,
		rowCount: totalCount,
		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,
		enableRowSelection: true,
		enableColumnPinning: true,
		enableMultiSort,
		maxMultiSortColCount,
		enableExpanding: true,
		getRowCanExpand: () => true,
		getRowId: (row) => row.id.toString(),
		onPaginationChange,
		onColumnFiltersChange,
		onSortingChange,
		onRowSelectionChange,
		onColumnPinningChange,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		meta: makeMeta<TableMeta>({ showConfirmDialog }),
		state: {
			pagination,
			columnFilters,
			sorting,
			rowSelection,
			columnPinning
		}
	});

	return (
		<Stack sx={{ overflow: 'hidden', width: '100vw', height: '100vh', p: 2, boxSizing: 'border-box' }}>
			<TableToolbar mb={2}>
				<TableToolbarInfo>
					<TableResultsLabel table={table} />
				</TableToolbarInfo>
				<TableToolbarActions>
					<Button
						color='primary'
						variant='contained'
						onClick={() => alert('Add something')}>
						Add
					</Button>
					<TableBulkActionButton
						table={table}
						color='error'
						variant='contained'
						onClick={showConfirmDialog}>
						Remove selected
					</TableBulkActionButton>
					<TableColumnVisibilityToggle
						table={table} />
				</TableToolbarActions>
			</TableToolbar>
			<Stack component={Paper} overflow='auto'>
				<TableContainer>
					<Table
						table={table}
						rowDetail={RowDetail}
						{...baseTableProps}
					/>
				</TableContainer>
				<TablePaginationV2 table={table} />
			</Stack>
			{confirmDialog}
		</Stack>
	);
};

/**
 * Provides state and update handlers for server side tanstack table demo.
 * Your implementation may vary depending on how you fetch data and handle state in your app.
 * @returns table state and update handlers
 */
const useTableState = () => {
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: ['select'], right: ['actions'] });

	// table pagination update handler
	const onPaginationChange: OnChangeFn<PaginationState> = useCallback(updater => setPagination(updater), [setPagination]);

	// table sorting update handler, also resets pagination on sorting change
	const onSortingChange: OnChangeFn<SortingState> = useCallback(updater => {
		setSorting(updater);
		setPagination(prev => ({ ...prev, pageIndex: 0 }));
	}, [setSorting, setPagination]);

	// table column filters update handler, also resets pagination on filter change
	const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(updater => {
		setColumnFilters(updater);
		setPagination(prev => ({ ...prev, pageIndex: 0 }));
	}, [setColumnFilters, setPagination]);

	// table row selection update handler
	const onRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(updater => setRowSelection(updater), [setRowSelection]);

	// table column pinning update handler
	const onColumnPinningChange: OnChangeFn<ColumnPinningState> = useCallback(updater => setColumnPinning(updater), [setColumnPinning]);

	return {
		pagination, sorting, columnFilters, rowSelection, columnPinning,
		onPaginationChange, onSortingChange, onColumnFiltersChange, onRowSelectionChange, onColumnPinningChange
	};
}
