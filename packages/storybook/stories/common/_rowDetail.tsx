import { Row } from '@tanstack/react-table';
import { Developer } from './_data';

export const RowDetail = ({ row }: { row: Row<Developer> }) => {
    return (
        <code>{JSON.stringify(row.original)}</code>
    );
};