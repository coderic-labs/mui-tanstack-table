import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
columnHelper.accessor('id', { header: MTT.TableHeader }),
columnHelper.accessor('name', { header: MTT.TableHeader }),
columnHelper.accessor('hireDate', {
header: MTT.TableHeader,
cell: ({ getValue }) => getValue().toDate().toLocaleDateString()
}),
columnHelper.accessor('employmentType', { header: MTT.TableHeader }),
columnHelper.accessor('verified', {
header: MTT.TableHeader,
cell: MTT.TableBooleanCell
}),
columnHelper.accessor('city', { header: MTT.TableHeader }),
columnHelper.accessor('mail', { header: MTT.TableHeader }),
columnHelper.accessor('phone', { header: MTT.TableHeader }),
columnHelper.accessor('technologies', {
header: MTT.TableHeader,
cell: ({ getValue }) => getValue().join(', ')
}),
columnHelper.accessor('projects', { header: MTT.TableHeader })
];

export const PagingClientSideDemo = () => {
const { data } = useItems();

const table = useReactTable<Developer>({
data,
columns,
getCoreRowModel: getCoreRowModel(),
getPaginationRowModel: getPaginationRowModel(),
initialState: {
pagination: { pageIndex: 0, pageSize: 10 }
}
});

return (
<Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box' }}>
<Stack component={Paper} overflow='auto'>
<TableContainer>
<MTT.Table table={table} />
</TableContainer>
<MTT.TablePaginationV2 table={table} />
</Stack>
</Stack>
);
};
