import { TableRow as MuiTableRow } from '@mui/material';
import { HeaderGroup } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../dataTests';
import { TableFooterCell, TableFooterFillerCell } from '../cells/tableFooterCell';

type TableFooterRowProps<T> = {
    footerGroup: HeaderGroup<T>;
    stickyFooter?: boolean;
    tableLayout: 'auto' | 'fixed';
    footerGroupIndex: number;
}

export const TableFooterRow = <T,>(props: TableFooterRowProps<T>) => {
    const { footerGroup, stickyFooter, tableLayout, footerGroupIndex } = props;

    return (
        <MuiTableRow
            {...getDataTestAttrs(dataTests.table.footerRow, footerGroupIndex + 1)}
            sx={{ '--rowcolor': theme => theme.palette.background.paper }}>
            {footerGroup.headers.map((header) =>
                <TableFooterCell
                    key={header.id}
                    header={header}
                    stickyFooter={stickyFooter}
                />
            )}
            {tableLayout === 'fixed' && <TableFooterFillerCell stickyFooter={stickyFooter} />}
        </MuiTableRow>
    );
};
