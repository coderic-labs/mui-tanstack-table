import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { getByDataTestId } from '../support/utils';

const tableDemos = [
	{ name: 'ClientSideTable', Component: ClientSideTableDemo },
	{ name: 'ServerSideTable', Component: ServerSideTableDemo }
] as const;

tableDemos.forEach(({ name, Component }) => {

	describe(name, () => {

		it(`renders pinned left and right cells as sticky`, () => {
			cy.mount(<Providers><Component /></Providers>);

			getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'position', 'sticky');
			getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'left', '0px');
			getByDataTestId(`${dataTests.table.dataCell}.1000.actions`).should('have.css', 'position', 'sticky');
			getByDataTestId(`${dataTests.table.dataCell}.1000.actions`).should('have.css', 'right', '0px');
		});

	});
});
