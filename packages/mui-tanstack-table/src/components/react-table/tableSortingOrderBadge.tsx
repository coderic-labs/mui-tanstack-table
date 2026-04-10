import { Box, styled } from '@mui/material';

export const TableSortingOrderBadge = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '14px',
	height: '14px',
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	borderRadius: '10px',
	fontSize: '10px'
}));
