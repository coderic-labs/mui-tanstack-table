import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';
import { getCellStyle } from '../common/_getCellStyle';

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        title: 'Name',
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        title: 'Employment Type',
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        title: 'Verified',
        cell: MTT.TableBooleanCell,
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        title: 'City',
    }),
];


export const RowHighlightDemo = () => {
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
                    <MTT.Table table={table} getCellStyle={getCellStyle('1001')} />
                </TableContainer>
            </Stack>
        </Stack>
    );
};
