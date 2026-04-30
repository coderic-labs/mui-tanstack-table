import { Button, ButtonProps } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';

/** Props for {@link TableBulkActionButton}. */
export type TableBulkActionButtonProps<T> = Omit<ButtonProps, 'onClick'> & {
    table: Table<T>,
    /** Receives the array of currently selected row IDs as the first argument. */
    onClick: (selectedRowIds: string[], e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

/**
 * MUI `Button` disabled when no rows are selected.
 * Passes the selected row IDs to the `onClick` handler.
 */
export const TableBulkActionButton = <T,>(props: TableBulkActionButtonProps<T>) => {
    const { table, onClick, disabled, ...rest } = props;
    const selectedRowIds = Object.keys(table.getState().rowSelection);
    return (
        <Button
            {...getDataTestAttrs(dataTests.bulkAction.button)}
            onClick={(e) => onClick(selectedRowIds, e)}
            disabled={disabled ?? selectedRowIds.length === 0}
            {...rest}
        />
    );
};
