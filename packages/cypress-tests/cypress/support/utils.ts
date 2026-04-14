import { dataTests } from '@coderic-labs/mui-tanstack-table';

export const getByDataTest = (value: string) =>
	cy.get(`[data-test="${value}"]`);

export const getByDataTestId = (value: string) =>
	cy.get(`[data-testid="${value}"]`);

export const allColumns = ['select', 'id', 'name', 'hireDate', 'employmentType', 'technologies', 'projects', 'verified', 'actions'] as const;

export const assertColumnVisibility = (visibleColumns: string[]) => {
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
