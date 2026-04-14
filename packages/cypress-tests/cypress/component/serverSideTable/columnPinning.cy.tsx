import { ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTestId } from '../../support/utils';

describe('ServerSideTable column pinning', () => {
	it('renders pinned left and right cells as sticky', () => {
		cy.mount(
			<Providers>
				<ServerSideTableDemo />
			</Providers>
		);

		getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'position', 'sticky');
		getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'left', '0px');
		getByDataTestId(`${dataTests.table.dataCell}.1000.actions`).should('have.css', 'position', 'sticky');
		getByDataTestId(`${dataTests.table.dataCell}.1000.actions`).should('have.css', 'right', '0px');
	});
});
