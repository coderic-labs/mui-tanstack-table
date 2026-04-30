import { DatePickerProps, PickerValidDate } from '@mui/x-date-pickers';

/**
 * Holds the selected date range used as the column filter value in {@link DateRangeFilter}.
 */
export type DateRangeFilterValue<TDate extends PickerValidDate> = {
    /** Start of the range (inclusive). `undefined` means no lower bound. */
    from?: TDate,
    /** End of the range (inclusive). `undefined` means no upper bound. */
    to?: TDate
}

/**
 * Extra props accepted by {@link DateRangeFilter} to customise the two `DatePicker` widgets.
 */
export type DateRangeFilterProps<TDate extends PickerValidDate> = {
    fromProps?: DatePickerProps<TDate>;
    toProps?: DatePickerProps<TDate>;
}
