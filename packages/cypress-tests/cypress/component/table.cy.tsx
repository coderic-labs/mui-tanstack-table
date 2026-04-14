import { ClientSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { getByDataTest, getByDataTestId } from '../support/utils';

describe('Table', () => {
	it('renders client side table', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);
		getByDataTest(dataTests.table.root).should('be.visible');
		getByDataTestId(`${dataTests.table.dataRow}.1`).should('exist');
	});
});
