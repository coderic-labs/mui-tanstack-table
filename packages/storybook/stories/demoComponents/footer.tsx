import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer, Typography } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, EmploymentType, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        title: 'Name',
        footer: ({ table }) => <Typography fontWeight={600}>{table.getRowModel().rows.length} names</Typography>,
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        title: 'Employment Type',
        footer: ({ table }) => {
            const rows = table.getRowModel().rows;
            const fullTimeCount = rows.filter(r => r.original.employmentType === EmploymentType.fulltime).length;
            return `${fullTimeCount} full-time`;
        },
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        title: 'Verified',
        cell: MTT.TableBooleanCell,
        footer: ({ table }) => `${table.getRowModel().rows.filter(r => r.original.verified).length} verified`,
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        title: 'City',
        footer: ({ table }) => `${new Set(table.getRowModel().rows.map(r => r.original.city)).size} cities`,
    }),
];

export const FooterDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <Stack component={Paper} overflow='hidden'>
                <TableContainer sx={{ maxHeight: 360 }}>
                    <MTT.Table table={table} stickyFooter />
                </TableContainer>
            </Stack>
        </Stack>
    );
};
