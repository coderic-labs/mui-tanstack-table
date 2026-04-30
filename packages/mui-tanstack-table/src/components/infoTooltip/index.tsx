import { InfoOutlined } from '@mui/icons-material';
import { SvgIconProps, Tooltip, TooltipProps } from '@mui/material';
import { dataTests, getDataTestAttrs } from '../../dataTests';

export type InfoTooltipProps = Omit<TooltipProps, 'children'> & {
    /** Props forwarded to the `InfoOutlined` icon that serves as the tooltip anchor. */
    AnchorProps?: SvgIconProps;
}

/** Renders an `InfoOutlined` icon that reveals a MUI `Tooltip` on hover. */
export const InfoTooltip = (props: InfoTooltipProps) => {
    const { AnchorProps, ...other } = props;
    return (
        <Tooltip {...other}>
            <InfoOutlined fontSize='inherit' {...getDataTestAttrs(dataTests.infoTooltip.anchor)} {...AnchorProps} />
        </Tooltip>
    );
};