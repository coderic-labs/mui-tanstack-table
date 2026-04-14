import { ClientSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTest } from '../../support/utils';

describe('ClientSideTable filtering', () => {
	it('applies and clears a text filter', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);

		getByDataTest(dataTests.table.dataRow).its('length').should('eq', 10);
		getByDataTest(dataTests.filters.textInput).first().find('input').type('___not_found___{enter}');
		getByDataTest(dataTests.table.emptyState).should('be.visible');
		getByDataTest(dataTests.header.filterClearButton).first().click();
		getByDataTest(dataTests.table.emptyState).should('not.exist');
		getByDataTest(dataTests.table.dataRow).its('length').should('eq', 10);
	});
});
