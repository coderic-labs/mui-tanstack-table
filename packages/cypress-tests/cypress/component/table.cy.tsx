import { ClientSideTableDemo } from '@demo-components';
import { Providers } from '../support/providers';

describe('Table', () => {
	it('renders client side table', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);
		cy.get('table').should('be.visible');
	});
});
