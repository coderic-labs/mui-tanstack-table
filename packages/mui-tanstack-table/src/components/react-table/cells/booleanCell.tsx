import { Check } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import React, {Fragment} from 'react';

export type BooleanCellProps<TData> = CellContext<TData, boolean> & {
	svgIconProps?: SvgIconProps;
	IconTrue?: React.ComponentType<SvgIconProps>;
	IconFalse?: React.ComponentType<SvgIconProps>;
};

export function BooleanCell<TData>(props: BooleanCellProps<TData>) {
	const {
		svgIconProps,
		IconTrue = (iconProps) => <Check {...iconProps}/>,
		IconFalse = Fragment,
		...cellContext
	} = props;
	return cellContext.getValue() ? <IconTrue {...svgIconProps} /> : <IconFalse {...svgIconProps} />;
}