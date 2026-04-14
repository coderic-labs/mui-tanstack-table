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

		it(`highlights the configured row`, () => {
			cy.mount(<Providers><Component highlightRow='1000' /></Providers>);

			getByDataTestId(`${dataTests.table.dataCell}.1000.select`)
				.should('have.css', 'background-color', 'rgb(71, 145, 219)');
		});

	});
});
