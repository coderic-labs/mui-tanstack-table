import { ClientSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../../support/providers';
import { getByDataTest, getByDataTestId } from '../../support/utils';

describe('ClientSideTable column visibility', () => {
	it('hides one column from the visibility menu', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);

		getByDataTestId(`${dataTests.table.headerCell}.id`).should('exist');
		getByDataTestId(`${dataTests.table.headerCell}.name`).should('exist');

		getByDataTest(dataTests.table.headerCell).its('length').then((beforeCount) => {
			getByDataTest(dataTests.columnVisibility.toggleButton).click();
			getByDataTestId(`${dataTests.columnVisibility.columnItem}.select`).should('not.exist');
			getByDataTestId(`${dataTests.columnVisibility.columnItem}.actions`).should('not.exist');
			getByDataTestId(`${dataTests.columnVisibility.columnItem}.id`).invoke('text').then((hiddenHeaderLabel) => {
				getByDataTestId(`${dataTests.columnVisibility.columnItem}.id`).click();
				getByDataTest(dataTests.table.headerCell).its('length').should('be.lt', beforeCount as number);
				getByDataTest(dataTests.table.headerCell).contains(hiddenHeaderLabel.trim()).should('not.exist');
				getByDataTestId(`${dataTests.table.headerCell}.id`).should('not.exist');
				getByDataTestId(`${dataTests.table.headerCell}.name`).should('exist');
			});
		});
	});

	it('uses bulk toggle to show all, hide all, then show all again', () => {
		cy.mount(
			<Providers>
				<ClientSideTableDemo />
			</Providers>
		);

		getByDataTest(dataTests.table.headerCell).its('length').then((initialCount) => {
			getByDataTest(dataTests.columnVisibility.toggleButton).click();
			getByDataTestId(`${dataTests.columnVisibility.columnItem}.select`).should('not.exist');
			getByDataTestId(`${dataTests.columnVisibility.columnItem}.actions`).should('not.exist');
			getByDataTestId(`${dataTests.columnVisibility.columnItem}.id`).invoke('text').then((idHeaderLabel) => {
				getByDataTestId(`${dataTests.columnVisibility.columnItem}.id`).click();
				getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('have.attr', 'data-indeterminate', 'true');

				getByDataTest(dataTests.columnVisibility.toggleAllItem).click();
				getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('be.checked');
				getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('not.have.attr', 'data-indeterminate', 'true');
				getByDataTest(dataTests.table.headerCell).its('length').should('eq', initialCount as number);
				getByDataTest(dataTests.table.headerCell).contains(idHeaderLabel.trim()).should('exist');

				getByDataTest(dataTests.columnVisibility.toggleAllItem).click();
				getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('not.be.checked');
				getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('not.have.attr', 'data-indeterminate', 'true');
				getByDataTest(dataTests.table.headerCell).its('length').should('be.lt', initialCount as number);

				getByDataTest(dataTests.columnVisibility.toggleAllItem).click();
				getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('be.checked');
				getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('not.have.attr', 'data-indeterminate', 'true');
				getByDataTest(dataTests.table.headerCell).its('length').should('eq', initialCount as number);
			});
		});
	});
});