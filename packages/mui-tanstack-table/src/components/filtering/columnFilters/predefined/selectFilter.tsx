import { MenuItem, Select, SelectProps } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../../../dataTests';

export type SelectFilterProps<F> = {
    selectProps?: SelectProps;
    options: { value: F, label: string }[];
}

export function SelectFilter<T, F extends string | number>(props: HeaderContext<T, unknown> & SelectFilterProps<F>) {
    const { options, selectProps = {}, ...headerContext } = props;
    const { multiple, sx, ...rest } = selectProps;
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
