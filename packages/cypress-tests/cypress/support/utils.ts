import { dataTests } from '@coderic-labs/mui-tanstack-table';

export const getByDataTest = (value: string) =>
	cy.get(`[data-test="${value}"]`);

export const getByDataTestId = (value: string) =>
	cy.get(`[data-testid="${value}"]`);

export const assertRowsRenderedInOrder = (rowIds: readonly (string | number)[]) => {
	getByDataTest(dataTests.table.dataRow).should('have.length.at.least', rowIds.length);

	rowIds.forEach((rowId, index) => {
		getByDataTest(dataTests.table.dataRow)
			.eq(index)
			.should('have.attr', 'data-testid', `${dataTests.table.dataRow}.${rowId}`);
	});
};

export const allColumns = ['select', 'id', 'name', 'hireDate', 'employmentType', 'technologies', 'projects', 'verified', 'actions'] as const;

export const assertColumnVisibility = (visibleColumns: readonly string[]) => {
	const visibleSet = new Set(visibleColumns);

	allColumns.forEach((columnId) => {
		const selector = `${dataTests.table.headerCell}.${columnId}`;
		if (visibleSet.has(columnId)) {
			getByDataTestId(selector).should('exist');
			return;
		}
		getByDataTestId(selector).should('not.exist');
	});
};
