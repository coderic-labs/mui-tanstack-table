import { useCallback, useState } from "react";

/**
 * Props injected by {@link useConfirmDialog} into the dialog component.
 */
export type ConfirmDialogProps<TData,> = {
    open: boolean;
    data: TData;
    onClose: () => void;
    onConfirm: () => void;
}

/**
 * Arguments accepted by {@link useConfirmDialog}.
 */
export type ConfirmDialogArgs<TData> = {
    /** Dialog component rendered by {@link useConfirmDialog}. Receives {@link ConfirmDialogProps}. */
    Component: React.ComponentType<ConfirmDialogProps<TData>>,
    onConfirm: (data: TData) => void;
}

/**
 * Manages confirmation dialog state and data.
 * Returns the rendered `confirmDialog` element plus `showConfirmDialog(data)` to open the dialog for a record.
 */
export const useConfirmDialog = <TData,>(props: ConfirmDialogArgs<TData>) => {
    const { Component, onConfirm } = props;
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<TData>();

    const showConfirmDialog = useCallback((data: TData) => {
        setData(data);
        setOpen(true);
    }, [setData, setOpen]);

    const confirmDialog = (
        <Component
            open={open}
            data={data as TData}
            onClose={() => setOpen(false)}
            onConfirm={() => { onConfirm(data as TData); setOpen(false); }} />
    );

    return { confirmDialog, showConfirmDialog };
}
