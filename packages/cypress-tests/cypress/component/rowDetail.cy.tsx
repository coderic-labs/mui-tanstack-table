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

		it(`expands row detail content`, () => {
			cy.mount(<Providers><Component /></Providers>);

			getByDataTest(dataTests.table.detailRow).should('not.exist');
			getByDataTest(dataTests.rowExpansion.resetButton).first().should('be.disabled');
			getByDataTest(dataTests.rowExpansion.rowToggleButton).first().click();
			getByDataTest(dataTests.table.detailRow).should('be.visible');
			getByDataTest(dataTests.table.detailRow).first().should('contain', '"id":1000');
			getByDataTest(dataTests.rowExpansion.resetButton).first().click();
			getByDataTest(dataTests.table.detailRow).should('not.exist');
		});

	});
});
