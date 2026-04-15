import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Button, Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.display({
        id: 'select',
        enableHiding: false,
        header: MTT.TableRowSelectionHeader,
        cell: MTT.TableRowSelectionCell
    }),
    columnHelper.accessor('id', {
        header: MTT.TableHeader
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        cell: MTT.TableBooleanCell
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader
    })
];

export const RowSelectionDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        enableRowSelection: true,
        getRowId: (row) => row.id,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <MTT.TableToolbar mb={2}>
                <MTT.TableToolbarInfo>
                    <MTT.TableResultsLabel table={table} />
                </MTT.TableToolbarInfo>
                <MTT.TableToolbarActions>
                    <MTT.TableBulkActionButton
                        table={table}
                        color='secondary'
                        variant='contained'
                        onClick={(selectedRowIds) => alert(`Selected row ids: ${selectedRowIds.join(', ')}`)}>
                        Log selected
                    </MTT.TableBulkActionButton>
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={() => table.resetRowSelection()}>
                        Clear selection
                    </Button>
                </MTT.TableToolbarActions>
            </MTT.TableToolbar>
            <Stack component={Paper} overflow='auto'>
                <TableContainer>
                    <MTT.Table table={table} />
                </TableContainer>
            </Stack>
        </Stack>
    );
};
