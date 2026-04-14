import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import {
	assertCurrentTableRowsSelected,
	assertRowsRenderedInOrder,
	assertSelectedRowsLabel,
	getByDataTest,
	getByDataTestId
} from '../support/utils';

const totalRows = 200;

const selectCurrentTableRows = (rowIds: readonly number[]) => {
	rowIds.forEach((rowId) => {
		getByDataTestId(`${dataTests.table.dataRow}.${rowId}`).within(() => {
			getByDataTest(dataTests.rowSelection.rowCheckbox).find('input').check({ force: true });
		});
	});
};

const tableDemos = [
	{
		name: 'ClientSideTable',
		Component: ClientSideTableDemo,
		crossPageSelectedLabelCounts: {
			afterFirstPageSelection: 3,
			afterSecondPageSelection: 5,
			afterReturningToFirstPage: 5
		}
	},
	{
		name: 'ServerSideTable',
		Component: ServerSideTableDemo,
		crossPageSelectedLabelCounts: {
			afterFirstPageSelection: 3,
			afterSecondPageSelection: 2,
			afterReturningToFirstPage: 3
		}
	}
] as const;

tableDemos.forEach(({ name, Component, crossPageSelectedLabelCounts }) => {

	describe(name, () => {

		it(`enables bulk action after selecting a row`, () => {
			cy.mount(<Providers><Component /></Providers>);
			const selectedRowIds = [1000, 1001] as const;

			getByDataTest(dataTests.bulkAction.button).should('be.disabled');
			selectCurrentTableRows(selectedRowIds);
			assertCurrentTableRowsSelected(selectedRowIds);
			getByDataTest(dataTests.bulkAction.button).should('not.be.disabled');
			assertSelectedRowsLabel(selectedRowIds.length, totalRows);
		});


		it(`keeps previously selected rows selected when paging away and back`, () => {
			cy.mount(<Providers><Component /></Providers>);
			const firstPageSelectedRowIds = [1000, 1003, 1007] as const;
			const secondPageSelectedRowIds = [1011, 1014] as const;

			assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
			selectCurrentTableRows(firstPageSelectedRowIds);
			assertCurrentTableRowsSelected(firstPageSelectedRowIds);
			assertSelectedRowsLabel(crossPageSelectedLabelCounts.afterFirstPageSelection, totalRows);

			getByDataTest(dataTests.paginationV2.nextButton).click();
			assertRowsRenderedInOrder([1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019]);
			selectCurrentTableRows(secondPageSelectedRowIds);
			assertCurrentTableRowsSelected(secondPageSelectedRowIds);
			assertSelectedRowsLabel(crossPageSelectedLabelCounts.afterSecondPageSelection, totalRows);

			getByDataTest(dataTests.paginationV2.prevButton).click();
			assertRowsRenderedInOrder([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
			assertCurrentTableRowsSelected(firstPageSelectedRowIds);
			assertSelectedRowsLabel(crossPageSelectedLabelCounts.afterReturningToFirstPage, totalRows);
		});

	});
});
