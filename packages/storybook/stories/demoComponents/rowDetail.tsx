import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';
import { RowDetail } from '../common/_rowDetail';

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.display({
        id: 'expand',
        header: MTT.TableRowExpansionHeader,
        cell: MTT.TableRowExpansionCell,
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        title: 'Name',
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        title: 'Employment Type',
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        title: 'City',
    }),
];

export const RowDetailDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        enableExpanding: true,
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <Stack component={Paper} overflow='auto'>
                <TableContainer>
                    <MTT.Table table={table} rowDetail={RowDetail} />
                </TableContainer>
            </Stack>
        </Stack>
    );
};
