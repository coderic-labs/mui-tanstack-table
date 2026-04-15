import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { getByDataTest } from '../support/utils';

const tableDemos = [
	{ name: 'ClientSideTable', Component: ClientSideTableDemo },
	{ name: 'ServerSideTable', Component: ServerSideTableDemo }
] as const;

tableDemos.forEach(({ name, Component }) => {

	describe(name, () => {

		it(`renders footer and footer cells`, () => {
			cy.mount(<Providers><Component /></Providers>);

			getByDataTest(dataTests.table.footer).scrollIntoView().should('be.visible');
			getByDataTest(dataTests.table.footerCell).its('length').should('be.greaterThan', 0);
			getByDataTest(dataTests.table.headerCell).its('length').then((headerCount) => {
				getByDataTest(dataTests.table.footerCell).its('length').should('eq', headerCount as number);
			});
		});

	});
});
