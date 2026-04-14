import { mount } from 'cypress/react';
import './commands';
import './providers';

Cypress.Commands.add('mount', mount);

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}
