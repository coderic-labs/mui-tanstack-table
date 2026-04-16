import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import { dataTests, getDataTestAttrs } from '../../dataTests';

export type SortingToggleProps = {
    isSorted: false | 'asc' | 'desc';
    onToggle: () => void;
};

export const TableSortingToggle = (props: SortingToggleProps) => {
    const { isSorted, onToggle } = props;

    const commonIconProps = {
        ...getDataTestAttrs(dataTests.header.sortLabel),
        'aria-label': 'Toggle sorting',
        'data-sort-state': isSorted || 'none',
        onClick: onToggle,
        sx: {
            cursor: 'pointer',
            color: 'inherit',
        },
        fontSize: 'small' as const,
    };

    if (isSorted === 'asc') {
        return <ArrowUpward {...commonIconProps} />;
    }

    if (isSorted === 'desc') {
        return <ArrowDownward {...commonIconProps} />;
    }

    return <SwapVert {...commonIconProps} sx={{ ...commonIconProps.sx, opacity: 0.45 }} />;
};
