import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Chip, IconButton, Paper, Stack, TableContainer } from '@mui/material';
import type { ColumnPinningState, FilterFnOption, RowSelectionState } from '@tanstack/react-table';
import { createColumnHelper, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { ConfirmDeleteDialog, employmentOptions, RowDetail, techOptions, verifiedLabels } from './_common';
import { Developer, useItems } from './_data';
import { DemoTableProps } from './_types';

type TableMeta = {
	showConfirmDialog: (items: Developer[]) => void;
}

const { BooleanFilter, DateRangeFilter, SelectFilter, TextFilter } = MTT.predefinedColumnFilters;

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
				<MTT.TableRowExpansionHeader {...context} />
				<MTT.TableRowSelectionHeader {...context} />
			</Stack>,
		cell: (context) =>
			<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
				<MTT.TableRowExpansionCell {...context} />
				<MTT.TableRowSelectionCell {...context} />
			</Stack>
	}),
	columnHelper.accessor('id', {
		header: MTT.TableHeader,
		footer: MTT.TableHeader
	}),
	columnHelper.accessor('name', {
		header: MTT.TableHeader,
		filter: TextFilter,
		filterFn: 'includesString',
		sortingFn: 'alphanumeric'
	}),
	columnHelper.accessor('hireDate', {
		header: MTT.TableHeader,
		title: 'Hire date',
		cell: ({ getValue }) => getValue().toDate().toLocaleDateString(),
		filter: DateRangeFilter,
		filterFn: filterHireDate,
		sortingFn: 'datetime'
	}),
	columnHelper.accessor('employmentType', {
		header: MTT.TableHeader,
		title: 'Employment type',
		filter: (context) => <SelectFilter {...context} options={employmentOptions} />,
		filterFn: 'equals',
		sortingFn: 'alphanumeric'
	}),
	columnHelper.accessor('technologies', {
		header: MTT.TableHeader,
		filter: (context) => <SelectFilter {...context} options={techOptions} selectProps={{ multiple: true }} />,
		cell: ({ getValue }) => <Stack direction='row' gap={1}>{getValue().map(x => <Chip size='small' key={x} label={x} />)}</Stack>,
		tooltip: 'Last updated 1.1.2025',
		filterFn: 'arrIncludesAll',
		sortingFn: 'auto'
	}),
	columnHelper.accessor('projects', {
		header: MTT.TableHeader,
		filter: TextFilter,
		cell: ({ getValue }) => <Chip size='small' label={getValue()} />,
		filterFn: 'weakEquals',
		sortingFn: 'alphanumeric'
	}),
	columnHelper.accessor('verified', {
		header: MTT.TableHeader,
		filter: (context) => <BooleanFilter {...context} labels={verifiedLabels} />,
		cell: MTT.TableBooleanCell,
		filterFn: 'equals',
		sortingFn: 'auto'
	}),
	columnHelper.display({
		id: 'actions',
		header: MTT.TableHeader,
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
						onClick={() => MTT.getTableMeta<TableMeta>(table).showConfirmDialog([row.original])}
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

	const { confirmDialog, showConfirmDialog } = MTT.useConfirmDialog({
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
		meta: MTT.makeMeta<TableMeta>({ showConfirmDialog }),
		state: {
			rowSelection,
			columnPinning
		}
	});

	return (
		<Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box' }}>
			<MTT.TableToolbar mb={2}>
				<MTT.TableToolbarInfo>
					<MTT.TableResultsLabel table={table} />
				</MTT.TableToolbarInfo>
				<MTT.TableToolbarActions>
					<Button
						color='secondary'
						variant='contained'
						onClick={() => alert('Add something')}>
						Add
					</Button>
					<MTT.TableBulkActionButton
						table={table}
						color='error'
						variant='contained'
						onClick={showConfirmDialog}>
						Remove selected
					</MTT.TableBulkActionButton>
					<MTT.TableColumnVisibilityToggle
						color='secondary'
						table={table} />
				</MTT.TableToolbarActions>
			</MTT.TableToolbar>
			<Stack component={Paper} overflow='auto'>
				<TableContainer>
					<MTT.Table
						table={table}
						rowDetail={RowDetail}
						{...baseTableProps}
					/>
				</TableContainer>
				<MTT.TablePaginationV2 table={table} />
			</Stack>
			{confirmDialog}
		</Stack>
	);
};
