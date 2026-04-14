import { ClientSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTest } from '../../support/utils';

describe('ClientSideTable row selection', () => {
	it('enables bulk action after selecting a row', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);

		getByDataTest(dataTests.bulkAction.button).should('be.disabled');
		getByDataTest(dataTests.rowSelection.rowCheckbox).eq(0).find('input').check({ force: true });
		getByDataTest(dataTests.rowSelection.rowCheckbox).eq(1).find('input').check({ force: true });
		getByDataTest(dataTests.bulkAction.button).should('not.be.disabled');
		getByDataTest(dataTests.results.label).should('contain', '2 /');
	});
});
