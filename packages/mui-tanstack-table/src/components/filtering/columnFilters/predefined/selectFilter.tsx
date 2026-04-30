import { MenuItem, Select, SelectProps } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../../dataTests';

/**
 * Extra props accepted by {@link SelectFilter}.
 */
export type SelectFilterProps<F> = {
    /** Props forwarded to the underlying MUI `Select` component. */
    selectProps?: SelectProps;
    /** List of option objects rendered as `MenuItem` elements. */
    options: { value: F, label: string }[];
}

/**
 * Dropdown column filter backed by a MUI `Select`.
 * Supports single and multi-select via `selectProps.multiple`.
 * Use as `columnDef.filter` to enable select filtering in the header.
 */
export function SelectFilter<T, F extends string | number>(props: HeaderContext<T, unknown> & SelectFilterProps<F>) {
    const { options, selectProps = {}, ...headerContext } = props;
    const { multiple, ...rest } = selectProps;
    const { column } = headerContext;
    const { setFilterValue, getFilterValue } = column;

    return (
        <Select
            {...getDataTestAttrs(dataTests.filters.select)}
            size="small"
            variant='standard'
            value={getFilterValue() ?? (multiple ? [] : '')}
            onChange={(e) => {
                const val = e.target.value;
                const fixedValue = Array.isArray(val) && val.length === 0 ? undefined : e.target.value;
                setFilterValue(fixedValue);
            }}
            multiple={multiple}
            {...rest}>
            {options.map(option =>
                <MenuItem
                    key={option.value}
                    value={option.value}>
                    {option.label}
                </MenuItem>)}
        </Select>
    );
}
