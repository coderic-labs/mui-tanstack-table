import { GetRowStyle } from "@coderic-labs/mui-tanstack-table";
import { darken, lighten, Theme } from "@mui/material";
import { Developer } from "./_data";

export const getRowStyle = (highlightRow?: string): GetRowStyle<Developer> => (row) => {
    if (row.original.id === highlightRow)
        return getHighlightedRowCellStyle;
    if (row.index % 2 === 1)
        return getEvenRowCellStyle;
};

const getHighlightedRowCellStyle = (theme: Theme) => {
    if (theme.palette.mode === 'dark')
        return { '--rowcolor': darken(theme.palette.warning.main, 0.8) };
    return { '--rowcolor': lighten(theme.palette.warning.main, 0.8) };
}

const getEvenRowCellStyle = (theme: Theme) => {
    if (theme.palette.mode === 'dark')
        return { '--rowcolor': lighten(theme.palette.background.paper, 0.02) };
    return { '--rowcolor': darken(theme.palette.background.paper, 0.02) };
}
