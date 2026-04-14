import { ClientSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTest } from '../../support/utils';

describe('ClientSideTable paging', () => {
	it('moves to next page and changes the first row', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);

		getByDataTest(dataTests.table.dataRow).first().invoke('text').then((firstValue) => {
			getByDataTest(dataTests.paginationV2.root).within(() => {
				cy.get('button[aria-label="Go to next page"]').click();
			});

			getByDataTest(dataTests.table.dataRow).first()
				.invoke('text')
				.should('not.eq', firstValue);
		});
	});

	it('updates current page rows when sorting changes', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
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
