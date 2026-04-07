import { InfoOutlined } from '@mui/icons-material';
import { SvgIconProps, Tooltip, TooltipProps } from '@mui/material';

export type InfoTooltipProps = Omit<TooltipProps, 'children'> & {
	AnchorProps?: SvgIconProps;
}

export const InfoTooltip = (props: InfoTooltipProps) => {
	const { AnchorProps, ...other } = props;
	return (
		<Tooltip {...other}>
			<InfoOutlined fontSize='inherit' {...AnchorProps} />
		</Tooltip>
	);
};