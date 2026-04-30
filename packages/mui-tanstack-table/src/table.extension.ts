import { ColumnDefTemplate, HeaderContext, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {

    /**
     * MTT augmentations to TanStack Table's per-column definition.
     * Set these when defining columns alongside standard TanStack column options.
     */
    interface ColumnDefBase<TData extends RowData, TValue = unknown> {
        /**
         * Filter UI rendered inside the column header.
         * Use one of the {@link predefinedColumnFilters} or supply a custom `ColumnDefTemplate`.
         */
        filter?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
        /**
         * Info tooltip content rendered next to the column title.
         * Accepts any `ColumnDefTemplate` (string, ReactNode, or render function).
         */
        tooltip?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
        /**
         * Human-readable column header label.
         * Falls back to `column.id` when omitted.
         */
        title?: string;
    }

}
