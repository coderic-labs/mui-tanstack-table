import { ClientSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTest } from '../../support/utils';

describe('ClientSideTable row detail', () => {
	it('expands row detail content', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);

		getByDataTest(dataTests.table.detailRow).should('not.exist');
		getByDataTest(dataTests.rowExpansion.rowToggleButton).first().click();
		getByDataTest(dataTests.table.detailRow).should('be.visible');
		getByDataTest(dataTests.table.detailRow).first().should('contain', '"id":1000');
		getByDataTest(dataTests.rowExpansion.resetButton).first().click();
		getByDataTest(dataTests.table.detailRow).should('not.exist');
	});
});