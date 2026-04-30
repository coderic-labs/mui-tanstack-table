import { Stack, styled } from '@mui/material';

/**
 * Styled `Stack` for the table toolbar row.
 * Lays out toolbar content as a space-between horizontal flex row.
 */
export const TableToolbar = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

/** Styled `Stack` for the right-hand action group in {@link TableToolbar} (buttons, toggles, etc.). */
export const TableToolbarActions = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(1),
    alignItems: 'center',
    alignSelf: 'start',
    flexShrink: 0
}));

/** Styled `Stack` for the left-hand informational area in {@link TableToolbar} (results label, filter overview, etc.). */
export const TableToolbarInfo = styled(Stack)(({ theme }) => ({
    flexDirection: 'column',
    gap: theme.spacing(0.5)
}));
