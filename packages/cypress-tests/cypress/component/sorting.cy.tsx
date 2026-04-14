import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { assertRowsRenderedInOrder, getByDataTest } from '../support/utils';

const tableDemos = [
	{ name: 'ClientSideTable', Component: ClientSideTableDemo },
	{ name: 'ServerSideTable', Component: ServerSideTableDemo }
] as const;

tableDemos.forEach(({ name, Component }) => {

	describe(name, () => {

		it(`keeps only one active sorted column when multi-sort is disabled`, () => {
			cy.mount(<Providers><Component enableMultiSort={false} /></Providers>);

			assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
			getByDataTest(dataTests.header.sortLabel).eq(0).click();
			getByDataTest(dataTests.header.sortLabel).eq(1).click();
			getByDataTest(dataTests.table.head).find('.MuiTableSortLabel-root.Mui-active').should('have.length', 1);
		});


		it(`keeps multiple active sorted columns when multi-sort is enabled`, () => {
			cy.mount(<Providers><Component enableMultiSort /></Providers>);

			assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
			getByDataTest(dataTests.header.sortLabel).eq(0).click();
			getByDataTest(dataTests.header.sortLabel).eq(1).click();
			getByDataTest(dataTests.table.head).find('.MuiTableSortLabel-root.Mui-active').should('have.length', 2);
		});

	});
});