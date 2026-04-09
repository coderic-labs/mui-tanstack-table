import {
	BooleanCell,
	getTableMeta, makeMeta, predefinedColumnFilters, ReactTable, ReactTableBulkActionButton,
	ReactTableColumnVisibilityToggle,
	ReactTableHeader,
	ReactTablePaginationV2,
	ReactTableResultsLabel,
	ReactTableToolbar,
	ReactTableToolbarActions,
	ReactTableToolbarInfo,
	RowExpansionCell, RowExpansionHeader, RowSelectionCell, RowSelectionHeader,
	useConfirmDialog
} from '@coderic-labs/mui-tanstack-table';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Chip, IconButton, Paper, Stack, TableContainer } from '@mui/material';
import type { ColumnPinningState } from '@tanstack/react-table';
import {
	createColumnHelper,
	FilterFnOption,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	RowSelectionState,
	useReactTable
} from '@tanstack/react-table';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { ConfirmDeleteDialog, employmentOptions, RowDetail, techOptions, verifiedLabels } from './_common';
import { Developer, useItems } from './_data';
import { DemoTableProps } from './_types';

type TableMeta = {
	showConfirmDialog: (items: Developer[]) => void;
}

const { BooleanFilter, DateRangeFilter, SelectFilter, TextFilter } = predefinedColumnFilters;

const columnHelper = createColumnHelper<Developer>();

const filterHireDate: FilterFnOption<Developer> = (row, id, filter) => {
	const hireDate = row.getValue(id) as Dayjs;
	const isInRange =
		(!filter?.from || hireDate.isAfter(filter.from)) &&
		(!filter?.to || hireDate.isBefore(filter.to));
	return isInRange;
};

const columns = [
	columnHelper.display({
		id: 'select',
		enableHiding: false,
		tableCellProps: { style: { minWidth: 'unset' } },
		header: (context) =>
			<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
				<RowExpansionHeader {...context} />
				<RowSelectionHeader {...context} />
			</Stack>,
		cell: (context) =>
			<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
				<RowExpansionCell {...context} />
				<RowSelectionCell {...context} />
			</Stack>
	}),
	columnHelper.accessor('id', {
		header: ReactTableHeader,
		footer: ReactTableHeader
	}),
	columnHelper.accessor('name', {
		header: ReactTableHeader,
		filter: TextFilter,
		filterFn: 'includesString',
		sortingFn: 'alphanumeric'
	}),
	columnHelper.accessor('hireDate', {
		header: ReactTableHeader,
		title: 'Hire date',
		cell: ({ getValue }) => getValue().toDate().toLocaleDateString(),
		filter: DateRangeFilter,
		filterFn: filterHireDate,
		sortingFn: 'datetime'
	}),
	columnHelper.accessor('employmentType', {
		header: ReactTableHeader,
		title: 'Employment type',
		filter: (context) => <SelectFilter {...context} options={employmentOptions} />,
		filterFn: 'equals',
		sortingFn: 'alphanumeric'
	}),
	columnHelper.accessor('technologies', {
		header: ReactTableHeader,
		filter: (context) => <SelectFilter {...context} options={techOptions} selectProps={{ multiple: true }} />,
		cell: ({ getValue }) => <Stack direction='row' gap={1}>{getValue().map(x => <Chip size='small' key={x} label={x} />)}</Stack>,
		tooltip: 'Last updated 1.1.2025',
		filterFn: 'arrIncludesAll',
		sortingFn: 'auto'
	}),
	columnHelper.accessor('projects', {
		header: ReactTableHeader,
		filter: TextFilter,
		cell: ({ getValue }) => <Chip size='small' label={getValue()} />,
		filterFn: 'weakEquals',
		sortingFn: 'alphanumeric'
	}),
	columnHelper.accessor('verified', {
		header: ReactTableHeader,
		filter: (context) => <BooleanFilter {...context} labels={verifiedLabels} />,
		cell: BooleanCell,
		filterFn: 'equals',
		sortingFn: 'auto'
	}),
	columnHelper.display({
		id: 'actions',
		header: ReactTableHeader,
		enableHiding: false,
		tableCellProps: { style: { minWidth: 'unset' } },
		cell: ({ row, table }) => {
			return (
				<Stack direction='row' gap={1}>
					<IconButton
						color="secondary"
						onClick={() => alert('edit: ' + JSON.stringify(row.original))}
					>
						<Edit />
					</IconButton>
					<IconButton
						color="secondary"
						onClick={() => getTableMeta<TableMeta>(table).showConfirmDialog([row.original])}
					>
						<Delete />
					</IconButton>
				</Stack>
			);
		}
	})
];

export const ClientSideTableDemo = (props: DemoTableProps) => {
	const { enableMultiSort, maxMultiSortColCount, ...baseTableProps } = props;
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [columnPinning] = useState<ColumnPinningState>({ left: ['select'], right: ['actions'] });

	const { data, deleteItems } = useItems();

	const { confirmDialog, showConfirmDialog } = useConfirmDialog({
		Component: ConfirmDeleteDialog,
		onConfirm: (items) => deleteItems(items.map(item => item.id))
	});

	const table = useReactTable<Developer>({
		columns,
		data,
		enableRowSelection: true,
		enableMultiSort,
		maxMultiSortColCount,
		enableColumnPinning: true,
		enableExpanding: true,
		getRowCanExpand: () => true,
		getRowId: (row) => row.id.toString(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		onRowSelectionChange: setRowSelection,
		meta: makeMeta<TableMeta>({ showConfirmDialog }),
		state: {
			rowSelection,
			columnPinning
		}
	});

	return (
		<Stack sx={{ overflow: 'hidden', width: '100vw', height: '100vh', p: 2, boxSizing: 'border-box' }}>
			<ReactTableToolbar mb={2}>
				<ReactTableToolbarInfo>
					<ReactTableResultsLabel table={table} />
				</ReactTableToolbarInfo>
				<ReactTableToolbarActions>
					<Button
						color='secondary'
						variant='contained'
						onClick={() => alert('Add something')}>
						Add
					</Button>
					<ReactTableBulkActionButton
						table={table}
						color='error'
						variant='contained'
						onClick={showConfirmDialog}>
						Remove selected
					</ReactTableBulkActionButton>
					<ReactTableColumnVisibilityToggle
						table={table} />
				</ReactTableToolbarActions>
			</ReactTableToolbar>
			<Stack component={Paper} overflow='auto'>
				<TableContainer>
					<ReactTable
						table={table}
						rowDetail={RowDetail}
						{...baseTableProps}
					/>
				</TableContainer>
				<ReactTablePaginationV2 table={table} />
			</Stack>
			{confirmDialog}
		</Stack>
	);
};
