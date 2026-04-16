import { MoreHoriz } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { Column } from '@tanstack/react-table';
import { useMemo, useRef, useState } from 'react';
import { useTableIntl } from '../../context/tableIntl';
import { dataTests, getDataTestAttrs } from '../../dataTests';

type ColumnOptionAction = {
    actionId: 'pin-left' | 'pin-right' | 'unpin' | 'hide-column';
    dataTest: string;
    enabled: boolean;
    handler: () => void;
    label: string;
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

    const actions = useMemo<ColumnOptionAction[]>(() => [
        {
            actionId: 'pin-left',
            dataTest: dataTests.header.pinLeftOption,
            enabled: canPin && !isPinned,
            handler: () => column.pin('left'),
            label: formatMessage({ id: 'reactTable.columnOptions.pinLeft' }),
        },
        {
            actionId: 'pin-right',
            dataTest: dataTests.header.pinRightOption,
            enabled: canPin && !isPinned,
            handler: () => column.pin('right'),
            label: formatMessage({ id: 'reactTable.columnOptions.pinRight' }),
        },
        {
            actionId: 'unpin',
            dataTest: dataTests.header.unpinOption,
            enabled: canPin && !!isPinned,
            handler: () => column.pin(false),
            label: formatMessage({ id: 'reactTable.columnOptions.unpin' }),
        },
        {
            actionId: 'hide-column',
            dataTest: dataTests.header.hideColumnOption,
            enabled: canHide,
            handler: () => column.toggleVisibility(false),
            label: formatMessage({ id: 'reactTable.columnOptions.hideColumn' }),
        },
    ], [canHide, canPin, column, formatMessage, isPinned]);

    const enabledActions = actions.filter(action => action.enabled);

    if (!enabledActions.length) {
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
                {enabledActions.map(action =>
                    <MenuItem
                        key={action.actionId}
                        {...getDataTestAttrs(action.dataTest)}
                        onClick={() => {
                            action.handler();
                            setOpen(false);
                        }}>
                        {action.label}
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};
