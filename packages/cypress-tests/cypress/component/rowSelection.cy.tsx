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

		it(`enables bulk action after selecting a row`, () => {
			cy.mount(<Providers><Component /></Providers>);

			getByDataTest(dataTests.bulkAction.button).should('be.disabled');
			getByDataTest(dataTests.rowSelection.rowCheckbox).eq(0).find('input').check({ force: true });
			getByDataTest(dataTests.rowSelection.rowCheckbox).eq(1).find('input').check({ force: true });
			getByDataTest(dataTests.bulkAction.button).should('not.be.disabled');
			getByDataTest(dataTests.results.label).first().should('contain', '2 /');
		});

	});
});
