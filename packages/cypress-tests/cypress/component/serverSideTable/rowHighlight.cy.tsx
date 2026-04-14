import { ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTestId } from '../../support/utils';

describe('ServerSideTable row highlight', () => {
	it('highlights the configured row', () => {
		cy.mount(
			<Providers>
				<ServerSideTableDemo highlightRow='1000' />
			</Providers>
		);

		getByDataTestId(`${dataTests.table.dataCell}.1.select`).invoke('css', 'background-color').then((firstRowColor) => {
			expect(firstRowColor).to.match(/^rgb\(/);
			getByDataTestId(`${dataTests.table.dataCell}.2.select`)
				.invoke('css', 'background-color')
				.should('not.eq', firstRowColor);
		});
	});
});
