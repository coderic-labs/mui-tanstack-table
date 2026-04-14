import { ClientSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { assertRowsRenderedInOrder, getByDataTest, getByDataTestId } from '../../support/utils';

const expectedRows = {
	nameTrac: [1000, 1033],
	hireDateRange2015To2017: [1002, 1008, 1012, 1014, 1018, 1022, 1034, 1035, 1045, 1050],
	employmentTypeIntern: [1003, 1005, 1007, 1011, 1013, 1023, 1027, 1031, 1036, 1041],
	technologiesReact: [1002, 1010, 1011, 1016, 1020, 1023, 1025, 1026, 1027, 1029],
	projects3: [1000, 1001, 1013, 1021, 1026, 1027, 1029, 1042, 1043, 1046],
	verifiedTrue: [1001, 1002, 1005, 1009, 1010, 1012, 1014, 1015, 1016, 1018]
} as const;

const expectedCounts = {
	default: 200,
	nameTrac: 2,
	hireDateRange2015To2017: 28,
	employmentTypeIntern: 57,
	technologiesReact: 90,
	projects3: 43,
	verifiedTrue: 103,
	unmatchedName: 0
} as const;

const assertResultsLabel = (count: number) => {
	getByDataTest(dataTests.results.label).first().should('have.text', `Results: ${count}`);
};

const assertDefaultRows = () => {
	assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
	getByDataTest(dataTests.table.dataRow).its('length').should('eq', 10);
	assertResultsLabel(expectedCounts.default);
};

const clearFilter = (columnId: string) => {
	getByDataTestId(`${dataTests.table.headerCell}.${columnId}`)
		.scrollIntoView()
		.find(`[data-test="${dataTests.header.filterClearButton}"]`)
		.click({ force: true });
};

describe('ClientSideTable filtering', () => {
	const mountTable = () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);
	};

	it('filters by name and clears filter', () => {
		mountTable();
		assertResultsLabel(expectedCounts.default);

		const term = 'trac';
		const expectedPageIds = expectedRows.nameTrac;

		getByDataTestId(`${dataTests.table.headerCell}.name`).find('input').type(`${term}{enter}`);
		assertResultsLabel(expectedCounts.nameTrac);
		getByDataTest(dataTests.table.dataRow).should('have.length', expectedPageIds.length);
		assertRowsRenderedInOrder(expectedPageIds);

		clearFilter('name');
		assertDefaultRows();
	});

	it('filters by hire date range and clears filter', () => {
		mountTable();
		assertResultsLabel(expectedCounts.default);

		const fromDate = '01/01/2015';
		const toDate = '01/01/2017';
		const expectedPageIds = expectedRows.hireDateRange2015To2017;

		getByDataTestId(`${dataTests.table.headerCell}.hireDate`).find('input').first().clear().type(fromDate);
		getByDataTestId(`${dataTests.table.headerCell}.hireDate`).find('input').eq(1).clear().type(`${toDate}{enter}`);
		assertResultsLabel(expectedCounts.hireDateRange2015To2017);
		getByDataTest(dataTests.table.dataRow).should('have.length', expectedPageIds.length);
		assertRowsRenderedInOrder(expectedPageIds);

		clearFilter('hireDate');
		assertDefaultRows();
	});

	it('filters by employment type and clears filter', () => {
		mountTable();
		assertResultsLabel(expectedCounts.default);

		const value = 'intern';
		const expectedPageIds = expectedRows.employmentTypeIntern;

		getByDataTestId(`${dataTests.table.headerCell}.employmentType`).find('[role="combobox"]').click();
		cy.get('[role="option"]').contains(value).click();
		assertResultsLabel(expectedCounts.employmentTypeIntern);
		getByDataTest(dataTests.table.dataRow).should('have.length', expectedPageIds.length);
		assertRowsRenderedInOrder(expectedPageIds);

		clearFilter('employmentType');
		assertDefaultRows();
	});

	it('filters by technologies and clears filter', () => {
		mountTable();
		assertResultsLabel(expectedCounts.default);

		const value = 'react';
		const expectedPageIds = expectedRows.technologiesReact;

		getByDataTestId(`${dataTests.table.headerCell}.technologies`).find('[role="combobox"]').click();
		cy.get('[role="option"]').contains(value).click();
		cy.get('body').click(0, 0);
		assertResultsLabel(expectedCounts.technologiesReact);
		getByDataTest(dataTests.table.dataRow).should('have.length', expectedPageIds.length);
		assertRowsRenderedInOrder(expectedPageIds);

		clearFilter('technologies');
		assertDefaultRows();
	});

	it('filters by projects and clears filter', () => {
		mountTable();
		assertResultsLabel(expectedCounts.default);

		const value = '3';
		const expectedPageIds = expectedRows.projects3;

		getByDataTestId(`${dataTests.table.headerCell}.projects`).find('input').type(`${value}{enter}`);
		assertResultsLabel(expectedCounts.projects3);
		getByDataTest(dataTests.table.dataRow).should('have.length', expectedPageIds.length);
		assertRowsRenderedInOrder(expectedPageIds);

		clearFilter('projects');
		assertDefaultRows();
	});

	it('filters by verified and clears filter', () => {
		mountTable();
		assertResultsLabel(expectedCounts.default);

		const expectedPageIds = expectedRows.verifiedTrue;

		getByDataTestId(`${dataTests.table.headerCell}.verified`)
			.scrollIntoView()
			.find(`[data-test="${dataTests.filters.booleanCheckbox}"]`)
			.click({ force: true });
		assertResultsLabel(expectedCounts.verifiedTrue);
		getByDataTest(dataTests.table.dataRow).should('have.length', expectedPageIds.length);
		assertRowsRenderedInOrder(expectedPageIds);

		clearFilter('verified');
		assertDefaultRows();
	});

	it('returns empty state for unmatched name and clears filter', () => {
		mountTable();
		assertResultsLabel(expectedCounts.default);

		getByDataTest(dataTests.filters.textInput).first().find('input').type('___not_found___{enter}');
		assertResultsLabel(expectedCounts.unmatchedName);
		getByDataTest(dataTests.table.emptyState).should('be.visible');
		getByDataTest(dataTests.header.filterClearButton).first().click();
		getByDataTest(dataTests.table.emptyState).should('not.exist');
		assertDefaultRows();
	});
});
