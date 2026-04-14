import { ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTest, getByDataTestId } from '../../support/utils';

describe('ServerSideTable paging', () => {
	it('moves to next page and changes the first row', () => {
		cy.mount(
			<Providers>
				<ServerSideTableDemo />
			</Providers>
		);

		getByDataTestId(`${dataTests.table.dataCell}.1.id`).invoke('text').then((firstValue) => {
			getByDataTest(dataTests.paginationV2.root).within(() => {
				cy.get('button[aria-label="Go to next page"]').click();
			});

			getByDataTestId(`${dataTests.table.dataCell}.1.id`)
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

		getByDataTest(dataTests.table.dataRow).first().invoke('text').then((pageTwoFirstRow) => {
			getByDataTest(dataTests.header.sortLabel).eq(0).click();
			getByDataTest(dataTests.table.dataRow).first().invoke('text').should('not.eq', pageTwoFirstRow);
		});
	});
});
