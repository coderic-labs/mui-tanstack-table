import { ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { assertRowsRenderedInOrder, getByDataTest } from '../../support/utils';

describe('ServerSideTable filtering', () => {
	it('applies and clears a text filter', () => {
		cy.mount(
			<Providers>
				<ServerSideTableDemo />
			</Providers>
		);

		assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
		getByDataTest(dataTests.table.dataRow).its('length').should('eq', 10);
		getByDataTest(dataTests.filters.textInput).first().find('input').type('___not_found___{enter}');
		getByDataTest(dataTests.table.emptyState).should('be.visible');
		getByDataTest(dataTests.header.filterClearButton).first().click();
		getByDataTest(dataTests.table.emptyState).should('not.exist');
		assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
		getByDataTest(dataTests.table.dataRow).its('length').should('eq', 10);
	});
});
