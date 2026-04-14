import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { Providers } from '../support/providers';
import {
	assertRowsRenderedInOrder,
	assertSelectedRowsLabel,
	getByDataTest,
	getByDataTestId
} from '../support/utils';

const totalRows = 200;
const rowsAfterDeletion = 196;

const selectCurrentTableRows = (rowIds: readonly number[]) => {
	rowIds.forEach((rowId) => {
		getByDataTestId(`${dataTests.table.dataRow}.${rowId}`).within(() => {
			getByDataTest(dataTests.rowSelection.rowCheckbox).find('input').check({ force: true });
		});
	});
};

const tableDemos = [
	{ name: 'ClientSideTable', Component: ClientSideTableDemo },
	{ name: 'ServerSideTable', Component: ServerSideTableDemo }
] as const;

tableDemos.forEach(({ name, Component }) => {

	describe(name, () => {

		it(`deletes multiple selected rows across pages`, () => {
			cy.mount(<Providers><Component /></Providers>);

			getByDataTest(dataTests.bulkAction.button).should('be.disabled');
			selectCurrentTableRows([1000, 1001]);
			assertSelectedRowsLabel(2, totalRows);
			getByDataTest(dataTests.paginationV2.nextButton).click();
			assertRowsRenderedInOrder([1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019]);
			selectCurrentTableRows([1010, 1011]);
			assertSelectedRowsLabel(4, totalRows);
			getByDataTest(dataTests.bulkAction.button).click();
			cy.get('.MuiDialogContent-root').should('contain.text', 'Delete 4 items?');
			cy.get('.MuiDialogActions-root').contains('button', 'Delete').click();
			getByDataTest(dataTests.results.label).first().should('have.text', `Results: ${rowsAfterDeletion}`);
			getByDataTestId(`${dataTests.table.dataRow}.1000`).should('not.exist');
			getByDataTestId(`${dataTests.table.dataRow}.1001`).should('not.exist');
			getByDataTestId(`${dataTests.table.dataRow}.1010`).should('not.exist');
			getByDataTestId(`${dataTests.table.dataRow}.1011`).should('not.exist');
		});

	});

});
