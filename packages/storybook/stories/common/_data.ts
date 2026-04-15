import { DateRangeFilterValue } from '@coderic-labs/mui-tanstack-table';
import { faker } from '@faker-js/faker';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import dayjs, { Dayjs } from 'dayjs';
import orderBy from 'lodash/orderBy';
import { useCallback, useMemo, useState } from 'react';

faker.seed(42);

export enum EmploymentType {
    fulltime = 'fulltime',
    partTime = 'partTime',
    intern = 'intern'
}

export const allEmploymentTypes = [EmploymentType.fulltime, EmploymentType.partTime, EmploymentType.intern];

export enum Techs {
    react = 'react',
    redux = 'redux',
    mui = 'mui',
    angular = 'angular',
    vue = 'vue',
    cSharp = 'cSharp',
    java = 'java'
}

export const allTechs = [Techs.react, Techs.redux, Techs.mui, Techs.angular, Techs.vue, Techs.cSharp, Techs.java];

export type Developer = {
    id: string;
    name: string;
    hireDate: Dayjs;
    employmentType: EmploymentType;
    verified: boolean;
    city: string;
    mail: string;
    phone: string;
    technologies: Techs[];
    projects: number;
}

type Filter = {
    name?: string;
    hireDate?: DateRangeFilterValue<Dayjs>;
    employmentType?: EmploymentType;
    verified?: boolean;
    city?: string;
    mail?: string;
    phone?: string;
    technologies?: Techs[];
    projects?: string;
}

export type Query = {
    columnFilters?: ColumnFiltersState;
    pagination?: PaginationState;
    sorting?: SortingState;
}

const _items = Array.from<unknown, Developer>({ length: 200 }, (_, index) => ({
    id: `${1000 + index}`,
    name: faker.person.fullName(),
    hireDate: dayjs(faker.date.past({ refDate: new Date(2020, 0, 1), years: 20 })),
    employmentType: faker.helpers.arrayElement(allEmploymentTypes),
    verified: faker.datatype.boolean(),
    city: faker.location.city(),
    mail: faker.internet.email(),
    phone: faker.phone.number(),
    technologies: faker.helpers.arrayElements(allTechs, { min: 1, max: 5 }),
    projects: faker.number.int({ min: 0, max: 3 })
}));

export const getItems = (items: Developer[], query: Query) => {
    console.log('request query', query);
    
    const { pagination, sorting } = query;
    const filters = toFilters(query.columnFilters ?? []);

    let result = filterItems(items, filters);

    if (sorting && sorting.length)
        result = orderBy(result, sorting.map(s => s.id), sorting.map(s => s.desc ? 'desc' : 'asc'));

    const totalCount = result.length;

    if (pagination) {
        const start = pagination.pageIndex * pagination.pageSize;
        const end = start + pagination.pageSize;
        result = result.slice(start, end);
    }

    return { data: result, totalCount };
};

const filterItems = (items: Developer[], filters: Filter) => {
    let result = [...items];
    const { hireDate, city, mail, name, phone, projects, technologies, employmentType, verified } = filters;
    if (hireDate?.from) result = result.filter(item => item.hireDate.isAfter(hireDate.from));
    if (hireDate?.to) result = result.filter(item => item.hireDate.isBefore(hireDate.to));
    if (city) result = result.filter(item => item.city.toLowerCase().includes(city.toLowerCase()));
    if (mail) result = result.filter(item => item.mail.toLowerCase().includes(mail.toLowerCase()));
    if (name) result = result.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    if (phone) result = result.filter(item => item.phone.includes(phone));
    if (projects) result = result.filter(item => item.projects === +projects);
    if (technologies) result = result.filter(item => technologies.every(role => item.technologies.includes(role)));
    if (employmentType) result = result.filter(item => item.employmentType === employmentType);
    if (verified !== undefined) result = result.filter(item => item.verified === verified);
    return result;
};

export const toFilters = (columnFiltersState: ColumnFiltersState): Filter =>
    columnFiltersState.reduce((prev, curr) => ({ ...prev, [curr.id]: curr.value }), {} as Filter);

export const useItems = (query: Query = {}) => {
    const { columnFilters, pagination, sorting } = query;
    const [items, setItems] = useState<Developer[]>(_items);

    const { data, totalCount } = useMemo(() => {
        return getItems(items, { columnFilters, sorting, pagination });
    }, [items, columnFilters, pagination, sorting]);

    const deleteItems = useCallback((ids: string[]) => {
        const newItems = items.filter(item => !ids.includes(item.id));
        setItems(newItems);
    }, [items, setItems]);

    return { data, totalCount, deleteItems };
};
