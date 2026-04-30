import { Table } from '@tanstack/react-table';

/**
 * Identity helper that infers the `meta` type from the object literal.
 * Pass the result to `useReactTable({ meta: makeMeta({...}) })`.
 */
export const makeMeta = <M>(meta: M) => meta;

/**
 * Retrieves the typed `meta` object from a table instance.
 * Use this wherever you need access to custom actions or state stored in `table.options.meta`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTableMeta = <M>(table: Table<any>) => table.options.meta as M;
