import { Check } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import React, {Fragment} from 'react';

/**
 * Props for {@link TableBooleanCell}. Extends TanStack `CellContext`.
 */
export type TableBooleanCellProps<TData> = CellContext<TData, boolean> & {
    /** Props forwarded to the icon component (applies to both `IconTrue` and `IconFalse`). */
    svgIconProps?: SvgIconProps;
    /** Icon rendered when the cell value is `true`. Defaults to `CheckIcon`. */
    IconTrue?: React.ComponentType<SvgIconProps>;
    /** Icon rendered when the cell value is `false`. Defaults to an empty `Fragment`. */
    IconFalse?: React.ComponentType<SvgIconProps>;
};

/**
 * Cell renderer for boolean values.
 * Renders `IconTrue` for `true` and `IconFalse` for `false`.
 */
export function TableBooleanCell<TData>(props: TableBooleanCellProps<TData>) {
    const {
        svgIconProps,
        IconTrue = (iconProps) => <Check {...iconProps}/>,
        IconFalse = Fragment,
        ...cellContext
    } = props;
    return cellContext.getValue() ? <IconTrue {...svgIconProps} /> : <IconFalse {...svgIconProps} />;
}
