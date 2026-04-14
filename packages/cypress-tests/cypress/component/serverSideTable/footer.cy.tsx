import { ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTest } from '../../support/utils';

describe('ServerSideTable footer', () => {
	it('renders footer and footer cells', () => {
		cy.mount(
			<Providers>
				<ServerSideTableDemo />
			</Providers>
		);

		getByDataTest(dataTests.table.footer).should('be.visible');
		getByDataTest(dataTests.table.footerCell).its('length').should('be.greaterThan', 0);
		getByDataTest(dataTests.table.headerCell).its('length').then((headerCount) => {
			getByDataTest(dataTests.table.footerCell).its('length').should('eq', headerCount as number);
		});
	});
});
