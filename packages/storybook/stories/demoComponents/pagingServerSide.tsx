import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { OnChangeFn, PaginationState, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
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

export const PagingServerSideDemo = () => {
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
    const { data, totalCount } = useItems({ pagination });

    const onPaginationChange: OnChangeFn<PaginationState> = useCallback((updater) => {
        setPagination(updater);
    }, []);

    const table = useReactTable<Developer>({
        data,
        columns,
        rowCount: totalCount,
        manualPagination: true,
        onPaginationChange,
        getCoreRowModel: getCoreRowModel(),
        state: {
            pagination
        }
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <Stack component={Paper} overflow='auto'>
                <TableContainer>
                    <MTT.Table table={table} />
                </TableContainer>
                <MTT.TablePaginationV2 table={table} />
            </Stack>
        </Stack>
    );
};
