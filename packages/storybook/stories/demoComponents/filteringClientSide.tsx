import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';
import { employmentOptions, techOptions, verifiedLabels } from '../common/_options';

const columnHelper = createColumnHelper<Developer>();
const { BooleanFilter, DateRangeFilter, SelectFilter, TextFilter } = MTT.predefinedColumnFilters;

const columns = [
    columnHelper.accessor('id', {
        header: MTT.TableHeader,
        filter: TextFilter,
        filterFn: 'includesString'
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        filter: TextFilter,
        filterFn: 'includesString'
    }),
    columnHelper.accessor('hireDate', {
        header: MTT.TableHeader,
        cell: ({ getValue }) => getValue().toDate().toLocaleDateString(),
        filter: DateRangeFilter
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        filter: (ctx) => <SelectFilter {...ctx} options={employmentOptions} />,
        filterFn: 'equals'
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        cell: MTT.TableBooleanCell,
        filter: (ctx) => <BooleanFilter {...ctx} labels={verifiedLabels} />,
        filterFn: 'equals'
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        filter: TextFilter,
        filterFn: 'includesString'
    }),
    columnHelper.accessor('mail', {
        header: MTT.TableHeader,
        filter: TextFilter,
        filterFn: 'includesString'
    }),
    columnHelper.accessor('phone', {
        header: MTT.TableHeader,
        filter: TextFilter,
        filterFn: 'includesString'
    }),
    columnHelper.accessor('technologies', {
        header: MTT.TableHeader,
        cell: ({ getValue }) => getValue().join(', '),
        filter: (ctx) => <SelectFilter {...ctx} options={techOptions} selectProps={{ multiple: true }} />,
        filterFn: 'arrIncludesAll'
    }),
    columnHelper.accessor('projects', {
        header: MTT.TableHeader,
        filter: TextFilter,
        filterFn: 'weakEquals'
    })
];

export const FilteringClientSideDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
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
