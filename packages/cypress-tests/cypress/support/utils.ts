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

export const assertPaginationLabel = (expectedLabel: string) => {
	getByDataTest(dataTests.paginationV2.root).within(() => {
		cy.get('p').contains(expectedLabel).should('exist');
	});
};

export const assertCurrentTableRowsSelected = (rowIds: readonly (string | number)[]) => {
	rowIds.forEach((rowId) => {
		getByDataTestId(`${dataTests.table.dataRow}.${rowId}`).within(() => {
			getByDataTest(dataTests.rowSelection.rowCheckbox).find('input').should('be.checked');
		});
	});
};

export const assertSelectedRowsLabel = (selectedCount: number, totalCount: number) => {
	getByDataTest(dataTests.results.label)
		.first()
		.should('have.text', `Results: ${selectedCount} / ${totalCount}`);
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
