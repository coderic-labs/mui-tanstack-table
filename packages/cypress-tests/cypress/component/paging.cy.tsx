import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { assertRowsRenderedInOrder, getByDataTest, assertPaginationLabel } from '../support/utils';

const tableDemos = [
	{ name: 'ClientSideTable', Component: ClientSideTableDemo },
	{ name: 'ServerSideTable', Component: ServerSideTableDemo }
] as const;

tableDemos.forEach(({ name, Component }) => {

	describe(name, () => {

		it(`moves to next page and changes the first row`, () => {
			cy.mount(<Providers><Component /></Providers>);

			assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
			assertPaginationLabel('1 / 20');
			
			getByDataTest(dataTests.paginationV2.nextButton).click();
			assertRowsRenderedInOrder([1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019]);
			assertPaginationLabel('2 / 20');
		});


		it(`resets to page 1 when sorting changes`, () => {
			cy.mount(<Providers><Component /></Providers>);

			getByDataTest(dataTests.paginationV2.nextButton).click();
			assertRowsRenderedInOrder([1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019]);
			assertPaginationLabel('2 / 20');

			getByDataTest(dataTests.header.sortLabel).eq(0).click().click();
			assertRowsRenderedInOrder([1199, 1198, 1197, 1196, 1195, 1194, 1193, 1192, 1191, 1190]);
			
			// Verify current page is reset to 1
			assertPaginationLabel('1 / 20');
		});


		it(`resets to page 1 when filter changes`, () => {
			cy.mount(<Providers><Component /></Providers>);

			getByDataTest(dataTests.paginationV2.nextButton).click();
			assertRowsRenderedInOrder([1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019]);
			assertPaginationLabel('2 / 20');

			getByDataTest(dataTests.filters.textInput).first().find('input').type('trac{enter}');
			assertRowsRenderedInOrder([1000, 1033]);
			assertPaginationLabel('1 / 1');
		});


		it(`resets to page 1 when page size changes`, () => {
			cy.mount(<Providers><Component /></Providers>);

			getByDataTest(dataTests.paginationV2.nextButton).click();
			assertRowsRenderedInOrder([1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019]);
			assertPaginationLabel('2 / 20');

			getByDataTest(dataTests.paginationV2.pageSizeSelect).click();
			getByDataTest(dataTests.paginationV2.pageSizeOption).contains(/^25$/).click();

			assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
			assertPaginationLabel('1 / 8');
		});

	});
});
