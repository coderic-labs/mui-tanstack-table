import { FilterAltOff, MoreHoriz, PushPin, PushPinOutlined, VisibilityOff } from '@mui/icons-material';
import { Divider, ListItemIcon, Menu, MenuItem, SvgIconProps } from '@mui/material';
import { Column } from '@tanstack/react-table';
import { useMemo, useRef, useState } from 'react';
import { useTableIntl } from '../../context/tableIntl';
import { dataTests, getDataTestAttrs } from '../../dataTests';

type ColumnOptionAction = {
    actionId: 'pin-left' | 'pin-right' | 'unpin' | 'hide-column' | 'clear-filter';
    dataTest: string;
    enabled: boolean;
    handler: () => void;
    label: string;
    Icon: React.ElementType<SvgIconProps>;
    iconProps?: SvgIconProps;
};

type TableColumnOptionsButtonProps<TData, TValue> = {
    column: Column<TData, TValue>;
};

export const TableColumnOptionsButton = <TData, TValue>(props: TableColumnOptionsButtonProps<TData, TValue>) => {
    const { column } = props;
    const { formatMessage } = useTableIntl();
    const anchorRef = useRef<SVGSVGElement | null>(null);
    const [open, setOpen] = useState(false);

    const canPin = column.getCanPin();
    const canHide = column.getCanHide();
    const isPinned = column.getIsPinned();
    const isFiltered = column.getIsFiltered();

    const actions = useMemo<(ColumnOptionAction | string)[]>(() => [
        'filtering',
        {
            actionId: 'clear-filter',
            dataTest: dataTests.header.clearFilterOption,
            enabled: isFiltered,
            handler: () => column.setFilterValue(undefined),
            label: formatMessage({ id: 'reactTable.columnOptions.clearFilter' }),
            Icon: FilterAltOff,
        },
        'column-layout',
        {
            actionId: 'pin-left',
            dataTest: dataTests.header.pinLeftOption,
            enabled: canPin && !isPinned,
            handler: () => column.pin('left'),
            label: formatMessage({ id: 'reactTable.columnOptions.pinLeft' }),
            Icon: PushPin,
            iconProps: { sx: { transform: 'rotate(90deg)' } },
        },
        {
            actionId: 'pin-right',
            dataTest: dataTests.header.pinRightOption,
            enabled: canPin && !isPinned,
            handler: () => column.pin('right'),
            label: formatMessage({ id: 'reactTable.columnOptions.pinRight' }),
            Icon: PushPin,
            iconProps: { sx: { transform: 'rotate(-90deg)' } },
        },
        {
            actionId: 'unpin',
            dataTest: dataTests.header.unpinOption,
            enabled: canPin && !!isPinned,
            handler: () => column.pin(false),
            label: formatMessage({ id: 'reactTable.columnOptions.unpin' }),
            Icon: PushPinOutlined,
        },
        {
            actionId: 'hide-column',
            dataTest: dataTests.header.hideColumnOption,
            enabled: canHide,
            handler: () => column.toggleVisibility(false),
            label: formatMessage({ id: 'reactTable.columnOptions.hideColumn' }),
            Icon: VisibilityOff,
        },
    ], [canHide, canPin, isFiltered, column, formatMessage, isPinned]);

    const menuItems = useMemo<(ColumnOptionAction & { icon?: JSX.Element } | string)[]>(() => {
        let items = actions.filter(action => typeof (action) === 'string' || (action as ColumnOptionAction).enabled);
        items = items.filter((item, idx, arr) => typeof item === 'object' || typeof arr[idx + 1] === 'object');
        if (typeof items[0] === 'string') items.shift();
        return items;
    }, [actions]);

    if (!menuItems.length) {
        return null;
    }

    return (
        <>
            <MoreHoriz
                ref={anchorRef}
                {...getDataTestAttrs(dataTests.header.columnOptionsButton)}
                aria-label='Column options'
                onClick={() => setOpen(true)}
                sx={{ cursor: 'pointer', color: 'inherit', }}
                fontSize='small'
            />
            <Menu
                {...getDataTestAttrs(dataTests.header.columnOptionsMenu)}
                anchorEl={anchorRef.current}
                open={open}
                onClose={() => setOpen(false)}>
                {menuItems.map(item =>
                    typeof (item) === 'string'
                        ? <Divider key={item} />
                        : <MenuItem
                            key={item.actionId}
                            {...getDataTestAttrs(item.dataTest)}
                            onClick={() => { item.handler(); setOpen(false); }}>
                            {item.Icon && <ListItemIcon><item.Icon {...item.iconProps} /></ListItemIcon>}
                            {item.label}
                        </MenuItem>
                )}
            </Menu>
        </>
    );
};
