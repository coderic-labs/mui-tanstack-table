import { TableCell as MuiTableCell } from '@mui/material';
import { flexRender, Header } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { getPinnedCellBackground, useDraggingStyles, useFooterCellStyle } from '../styleUtils';

/**
 * Props for {@link TableFooterCell}.
 */
export type TableFooterCellProps<T> = {
    /** TanStack `Header` instance for this footer cell. */
    header: Header<T, unknown>;
    /** When `true`, applies `position: sticky; bottom: 0` to keep the footer visible while scrolling. */
    stickyFooter?: boolean;
};

/**
 * Renders a footer table cell, including pinning and drag-reorder styles.
 */
export const TableFooterCell = <T,>(props: TableFooterCellProps<T>) => {
    const { header, stickyFooter } = props;

    const footerCellStyle = useFooterCellStyle(header.column, header.getContext().table, stickyFooter);
    const { draggingStyles, setNodeRef } = useDraggingStyles(header.column.id, 6);

    return (
        <MuiTableCell
            ref={setNodeRef}
            colSpan={header.colSpan}
            {...getDataTestAttrs(dataTests.table.footerCell, header.column.id)}
            sx={footerCellStyle}
            style={draggingStyles}>
            {flexRender(header.column.columnDef.footer, header.getContext())}
        </MuiTableCell>
    );
};

type TableFooterFillerCellProps = {
    stickyFooter?: boolean;
};

/** Empty filler cell used to fill remaining space in footer rows with pinned columns. */
export const TableFooterFillerCell = (props: TableFooterFillerCellProps) => {
    const { stickyFooter } = props;

    return (
        <MuiTableCell
            {...getDataTestAttrs(dataTests.table.footerCell)}
            sx={{
                backgroundColor: `var(--rowcolor)`,
                padding: 0,
                position: stickyFooter ? 'sticky' : 'relative',
                zIndex: stickyFooter ? 1 : undefined,
                bottom: stickyFooter ? 0 : undefined,
                backgroundImage: getPinnedCellBackground
            }}>
        </MuiTableCell>
    );
};
