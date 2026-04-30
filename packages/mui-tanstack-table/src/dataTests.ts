/**
 * Hierarchy of `data-test` / `data-testid` attribute string constants used by all MTT components.
 * Reference these in Cypress tests via `getByDataTest` / `getByDataTestId` helpers — never use
 * CSS selectors or visible text in tests.
 */
export const dataTests = {
    table: {
        root: 'mtt-table',
        head: 'mtt-table-head',
        body: 'mtt-table-body',
        footer: 'mtt-table-footer',
        headerRow: 'mtt-table-header-row',
        headerCell: 'mtt-table-header-cell',
        footerRow: 'mtt-table-footer-row',
        footerCell: 'mtt-table-footer-cell',
        dataRow: 'mtt-table-data-row',
        dataCell: 'mtt-table-data-cell',
        detailRow: 'mtt-table-detail-row',
        emptyRow: 'mtt-table-empty-row',
        emptyState: 'mtt-table-empty-state'
    },
    header: {
        sortLabel: 'mtt-header-sort-label',
        columnOptionsButton: 'mtt-header-column-options-button',
        columnOptionsMenu: 'mtt-header-column-options-menu',
        pinLeftOption: 'mtt-header-pin-left-option',
        pinRightOption: 'mtt-header-pin-right-option',
        unpinOption: 'mtt-header-unpin-option',
        clearFilterOption: 'mtt-header-clear-filter-option',
        hideColumnOption: 'mtt-header-hide-column-option',
        filterContainer: 'mtt-header-filter-container',
        filterPopoverTrigger: 'mtt-header-filter-popover-trigger',
        filterPopover: 'mtt-header-filter-popover',
        reorderHandle: 'mtt-header-reorder-handle',
        resizeHandle: 'mtt-header-resize-handle'
    },
    pagination: {
        root: 'mtt-table-pagination',
        pager: 'mtt-table-pagination-pager',
        pageSizeSelect: 'mtt-table-pagination-page-size-select'
    },
    paginationV2: {
        root: 'mtt-table-pagination-v2',
        nextButton: 'mtt-table-pagination-v2-next-button',
        prevButton: 'mtt-table-pagination-v2-prev-button',
        firstButton: 'mtt-table-pagination-v2-first-button',
        lastButton: 'mtt-table-pagination-v2-last-button',
        pageSizeSelect: 'mtt-table-pagination-v2-page-size-select',
        pageSizeOption: 'mtt-table-pagination-v2-page-size-option'
    },
    rowSelection: {
        headerCheckbox: 'mtt-row-selection-header-checkbox',
        rowCheckbox: 'mtt-row-selection-row-checkbox'
    },
    rowExpansion: {
        rowToggleButton: 'mtt-row-expansion-toggle-button',
        resetButton: 'mtt-row-expansion-reset-button'
    },
    bulkAction: {
        button: 'mtt-bulk-action-button'
    },
    columnVisibility: {
        toggleButton: 'mtt-column-visibility-toggle-button',
        menu: 'mtt-column-visibility-menu',
        toggleAllItem: 'mtt-column-visibility-toggle-all-item',
        columnItem: 'mtt-column-visibility-column-item'
    },
    filterOverview: {
        root: 'mtt-filter-overview',
        chip: 'mtt-filter-overview-chip',
        resetButton: 'mtt-filter-overview-reset-button'
    },
    resetHeader: {
        button: 'mtt-table-reset-header-button'
    },
    results: {
        label: 'mtt-table-results-label'
    },
    infoTooltip: {
        anchor: 'mtt-info-tooltip-anchor'
    },
    filters: {
        textInput: 'mtt-filter-text-input',
        textApplyButton: 'mtt-filter-text-apply-button',
        select: 'mtt-filter-select',
        date: 'mtt-filter-date',
        dateRangeFrom: 'mtt-filter-date-range-from',
        dateRangeTo: 'mtt-filter-date-range-to',
        booleanCheckbox: 'mtt-filter-boolean-checkbox',
        booleanLabel: 'mtt-filter-boolean-label'
    }
} as const;


/**
 * Builds a `data-test` / `data-testid` attribute object for a DOM element.
 * Always emits `data-test`; appends `data-testid="value.id"` when `id` is provided.
 * @param value - Base test-id string from {@link dataTests}.
 * @param id - Optional row/column/item identifier appended after a dot.
 * @returns Spread-ready attribute object.
 */
export const getDataTestAttrs = (value: string, id?: string | number) => ({
    'data-test': value,
    ...(id !== undefined ? { 'data-testid': `${value}.${id}` } : {})
});
