import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Chip, Link, Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
	columnHelper.accessor('name', {
		header: MTT.TableHeader,
		title: 'Name',
	}),
	columnHelper.accessor('mail', {
		header: MTT.TableHeader,
		title: 'Email',
		cell: ({ getValue }) => (
			<Link href={`mailto:${getValue()}`}>{getValue()}</Link>
		),
	}),
	columnHelper.accessor('verified', {
		header: MTT.TableHeader,
		title: 'Verified',
		cell: MTT.TableBooleanCell,
	}),
	columnHelper.accessor('technologies', {
		header: MTT.TableHeader,
		title: 'Technologies',
		cell: ({ getValue }) => (
			<Stack direction='row' gap={0.5} flexWrap='wrap'>
				{getValue().map((tech) => (
					<Chip key={tech} label={tech} size='small' />
				))}
			</Stack>
		),
	}),
];

export const CustomCellRendersDemo = () => {
	const { data } = useItems();

	const table = useReactTable<Developer>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
			<Stack component={Paper} overflow='auto'>
				<TableContainer>
					<MTT.Table table={table} />
				</TableContainer>
			</Stack>
		</Stack>
	);
};
