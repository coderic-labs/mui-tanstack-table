import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { dataTests, getDataTestAttrs } from '../../dataTests';

export type SortingToggleProps = {
    isSorted: false | 'asc' | 'desc';
    onToggle: () => void;
};

export const TableSortingToggle = (props: SortingToggleProps) => {
    const { isSorted, onToggle } = props;

    let Icon = SwapVert;
    if (isSorted === 'asc') Icon = ArrowUpward;
    if (isSorted === 'desc') Icon = ArrowDownward;

    return (
        <IconButton
            {...getDataTestAttrs(dataTests.header.sortLabel)}
            aria-label='Toggle sorting'
            data-sort-state={isSorted || 'none'}
            size='small'
            sx={{ margin: -5 / 8 }}
            onClick={onToggle}>
            <Icon fontSize='small' sx={{ opacity: !isSorted ? 0.45 : undefined }} />
        </IconButton>
    )
};
