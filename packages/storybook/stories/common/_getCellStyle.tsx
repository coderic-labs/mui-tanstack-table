import { GetCellStyle } from "@coderic-labs/mui-tanstack-table";
import { darken, lighten, Theme } from "@mui/material";
import { Developer } from "./_data";

export const getCellStyle = (highlightRow?: string): GetCellStyle<Developer> => (cell) => {
    if (cell.row.original.id === highlightRow)
        return getHighlightedRowCellStyle;
    if (cell.row.index % 2 === 1)
        return getEvenRowCellStyle;
};

const getHighlightedRowCellStyle = (theme: Theme) => {
    if (theme.palette.mode === 'dark')
        return { backgroundColor: darken(theme.palette.warning.main, 0.8) };
    return { backgroundColor: lighten(theme.palette.warning.main, 0.8) };
}

const getEvenRowCellStyle = (theme: Theme) => {
    if (theme.palette.mode === 'dark')
        return { backgroundColor: lighten(theme.palette.background.paper, 0.02) };
    return { backgroundColor: darken(theme.palette.background.paper, 0.02) };
}
