import { Divider, DividerProps } from "@mui/material";
import { Header } from "@tanstack/react-table";
import { dataTests, getDataTestAttrs } from '../../dataTests';

type TableColumnResizeHandlerProps<T> = {
    header: Header<T, unknown>;
} & Omit<DividerProps, 'onDoubleClick' | 'onMouseDown' | 'onTouchStart' | 'orientation'>;

export const TableColumnResizeHandler = <T,>(props: TableColumnResizeHandlerProps<T>) => {
    const { header, sx, ...rest } = props;

    return (
        <Divider
            {...getDataTestAttrs(dataTests.header.resizeHandle, header.column.id)}
            onDoubleClick={() => header.column.resetSize()}
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            orientation='vertical'
            sx={{
                position: 'absolute',
                right: 0,
                height: 'calc(100% - 16px)',
                top: '50%',
                transform: 'translateY(-50%)',
                borderWidth: '2px',
                borderRadius: '4px',
                cursor: 'col-resize',
                userSelect: 'none',
                touchAction: 'none',
                ...sx,
            }}
            {...rest}
        />
    );
};
