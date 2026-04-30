import { Checkbox, FormControlLabel } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { dataTests, getDataTestAttrs } from '../../../../dataTests';

/** Label overrides for the tri-state checkbox values in {@link BooleanFilter}. */
export type BooleanFilterProps = {
    /**
     * Labels for each checkbox state.
     * Omit to hide state labels.
     */
    labels?: {
        /** Label shown when no filter is active (indeterminate). */
        undetermined: string;
        /** Label shown when the filter is `true`. */
        checked: string;
        /** Label shown when the filter is `false`. */
        unchecked: string;
    }
};

/**
 * Tri-state checkbox filter for boolean columns.
 * Use as `columnDef.filter` to enable boolean filtering in the header.
 */
export function BooleanFilter<T>(props: HeaderContext<T, boolean> & BooleanFilterProps) {
    const { labels, ...headerContext } = props;
    const { column } = headerContext;
    const { setFilterValue, getFilterValue } = column;

    const filterValue = getFilterValue() as boolean | undefined;

    const handleChange = useCallback(() => setFilterValue((prev: boolean) => {
        if (prev === undefined) return true;
        if (prev === true) return false;
        return undefined;
    }), [setFilterValue]);

    const label = useMemo(() => {
        if (filterValue === undefined) return labels?.undetermined;
        if (filterValue) return labels?.checked;
        return labels?.unchecked;
    }, [filterValue, labels]);

    return (
        <FormControlLabel
            {...getDataTestAttrs(dataTests.filters.booleanLabel)}
            label={label}
            sx={{ height: 32.25, marginRight: 0 }}
            control={
                <Checkbox
                    {...getDataTestAttrs(dataTests.filters.booleanCheckbox)}
                    checked={filterValue ?? false}
                    indeterminate={getFilterValue() === undefined}
                    onChange={handleChange}
                />
            }
        />
    );
}
