import { BooleanFilter } from './booleanFilter';
import { DateFilter, DateRangeFilter } from './dateFilter';
import { SelectFilter } from './selectFilter';
import { TextFilter } from './textFilter';

/**
 * Built-in column filter components for easy import.
 * Assign a member to `columnDef.filter` to enable that filter type.
 */
export const predefinedColumnFilters = {
    TextFilter,
    BooleanFilter,
    DateFilter,
    DateRangeFilter,
    SelectFilter
};
