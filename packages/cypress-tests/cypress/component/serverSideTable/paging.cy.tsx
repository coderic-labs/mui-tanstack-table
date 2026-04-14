import { ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { assertRowsRenderedInOrder, getByDataTest, getByDataTestId } from '../../support/utils';

describe('ServerSideTable paging', () => {
	it('moves to next page and changes the first row', () => {
		cy.mount(
			<Providers>
				<ServerSideTableDemo />
			</Providers>
		);

		assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
		getByDataTestId(`${dataTests.table.dataCell}.1000.id`).invoke('text').then((firstValue) => {
			getByDataTest(dataTests.paginationV2.root).within(() => {
				cy.get('button[aria-label="Go to next page"]').click();
			});

			assertRowsRenderedInOrder([1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019]);
			getByDataTestId(`${dataTests.table.dataCell}.1010.id`)
				.invoke('text')
				.should('not.eq', firstValue);
		});
	});

	it('updates current page rows when sorting changes', () => {
		cy.mount(
			<Providers>
				<ServerSideTableDemo />
			</Providers>
		);

		getByDataTest(dataTests.paginationV2.root).within(() => {
			cy.get('button[aria-label="Go to next page"]').click();
		});

		assertRowsRenderedInOrder([1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019]);

		getByDataTest(dataTests.table.dataRow).first().invoke('text').then((pageTwoFirstRow) => {
			getByDataTest(dataTests.header.sortLabel).eq(0).click();
			assertRowsRenderedInOrder([1199, 1198, 1197, 1196, 1195, 1194, 1193, 1192, 1191, 1190]);
			getByDataTest(dataTests.table.dataRow).first().invoke('text').should('not.eq', pageTwoFirstRow);
		});
	});
});
