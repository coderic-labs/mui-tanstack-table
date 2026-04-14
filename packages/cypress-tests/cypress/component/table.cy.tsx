import { ClientSideTableDemo } from '@demo-components';

describe('Table', () => {
	it('renders client side table', () => {
		cy.mount(<ClientSideTableDemo />);
		cy.get('table').should('be.visible');
	});
});
