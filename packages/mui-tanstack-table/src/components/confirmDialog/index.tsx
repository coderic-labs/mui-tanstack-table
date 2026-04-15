import { useCallback, useState } from "react";

export type ConfirmDialogProps<TData,> = {
    open: boolean;
    data: TData;
    onClose: () => void;
    onConfirm: () => void;
}

export type ConfirmDialogArgs<TData> = {
    Component: React.ComponentType<ConfirmDialogProps<TData>>,
    onConfirm: (data: TData) => void;
}

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