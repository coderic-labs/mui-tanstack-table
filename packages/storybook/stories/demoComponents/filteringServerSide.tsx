import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { ColumnFiltersState, OnChangeFn, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { Developer, useItems } from '../common/_data';
import { employmentOptions, techOptions, verifiedLabels } from '../common/_options';

const columnHelper = createColumnHelper<Developer>();
const { BooleanFilter, DateRangeFilter, SelectFilter, TextFilter } = MTT.predefinedColumnFilters;

const columns = [
    columnHelper.accessor('id', {
        header: MTT.TableHeader,
        filter: TextFilter
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        filter: TextFilter
    }),
    columnHelper.accessor('hireDate', {
        header: MTT.TableHeader,
        cell: ({ getValue }) => getValue().toDate().toLocaleDateString(),
        filter: DateRangeFilter
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        filter: (ctx) => <SelectFilter {...ctx} options={employmentOptions} />
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        cell: MTT.TableBooleanCell,
        filter: (ctx) => <BooleanFilter {...ctx} labels={verifiedLabels} />
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        filter: TextFilter
    }),
    columnHelper.accessor('mail', {
        header: MTT.TableHeader,
        filter: TextFilter
    }),
    columnHelper.accessor('phone', {
        header: MTT.TableHeader,
        filter: TextFilter
    }),
    columnHelper.accessor('technologies', {
        header: MTT.TableHeader,
        cell: ({ getValue }) => getValue().join(', '),
        filter: (ctx) => <SelectFilter {...ctx} options={techOptions} selectProps={{ multiple: true }} />
    }),
    columnHelper.accessor('projects', {
        header: MTT.TableHeader,
        filter: TextFilter
    })
];

export const FilteringServerSideDemo = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const { data, totalCount } = useItems({ columnFilters });

    const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback((updater) => {
        setColumnFilters(updater);
    }, []);

    const table = useReactTable<Developer>({
        data,
        columns,
        rowCount: totalCount,
        manualFiltering: true,
        onColumnFiltersChange,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnFilters
        }
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
