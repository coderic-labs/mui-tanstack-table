import { Table } from '@tanstack/react-table';

/**
 * Helper function to create a meta object for a table.
 * table.meta is used to store additional information about the table, such as actions or state.
 * @param meta meta object to be associated with the table
 * @returns same meta object
 */
export const makeMeta = <M>(meta: M) => meta;
/**
 * Helper function to retrieve the meta object from a table.
 * This is useful to access actions or other state stored in the table's meta.
 * @param table table instance from which to retrieve the meta object
 * @returns Meta object associated with the table
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTableMeta = <M>(table: Table<any>) => table.options.meta as M;