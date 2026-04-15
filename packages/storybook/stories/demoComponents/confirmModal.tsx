import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Button, Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ConfirmDeleteDialog } from '../common/_confirmDeleteDialog';
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

export const ConfirmModalDemo = () => {
    const { data, deleteItems } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        enableRowSelection: true,
        getRowId: (row) => row.id,
        getCoreRowModel: getCoreRowModel()
    });

    // Use the confirm dialog hook with custom dialog component and confirmation handler
    const { confirmDialog, showConfirmDialog } = MTT.useConfirmDialog<string[]>({
        Component: ConfirmDeleteDialog,
        onConfirm: (selectedRowIds) => {
            // Delete selected rows from data
            deleteItems(selectedRowIds);
            // Clear selection after deletion
            table.resetRowSelection();
        }
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
                        color="error"
                        variant="contained"
                        onClick={showConfirmDialog}>
                        Delete Selected
                    </MTT.TableBulkActionButton>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => table.resetRowSelection()}>
                        Clear Selection
                    </Button>
                </MTT.TableToolbarActions>
            </MTT.TableToolbar>
            <Stack component={Paper} overflow="auto">
                <TableContainer>
                    <MTT.Table table={table} />
                </TableContainer>
            </Stack>
            {confirmDialog}
        </Stack>
    );
};
