import { Stack, styled } from '@mui/material';

export const ReactTableToolbar = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(4),
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center'
}));

export const ReactTableToolbarActions = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	gap: theme.spacing(1),
	alignItems: 'center',
	alignSelf: 'start',
	flexShrink: 0
}));

export const ReactTableToolbarInfo = styled(Stack)(({ theme }) => ({
	flexDirection: 'column',
	gap: theme.spacing(0.5)
}));
