import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { Providers } from '../support/providers';
import { allColumns, assertColumnVisibility, getByDataTest, getByDataTestId } from '../support/utils';

const allVisibleColumns = [...allColumns];
const visibleWithoutId = allVisibleColumns.filter(column => column !== 'id');
const pinnedOnly = ['select', 'actions'];

const tableDemos = [
    { name: 'ClientSideTable', Component: ClientSideTableDemo },
    { name: 'ServerSideTable', Component: ServerSideTableDemo }
] as const;

tableDemos.forEach(({ name, Component }) => {

    describe(name, () => {

        it(`hides one column from the visibility menu`, () => {
            cy.mount(<Providers><Component /></Providers>);
            
            assertColumnVisibility(allVisibleColumns);
            getByDataTest(dataTests.columnVisibility.toggleButton).click();
            getByDataTestId(`${dataTests.columnVisibility.columnItem}.select`).should('not.exist');
            getByDataTestId(`${dataTests.columnVisibility.columnItem}.actions`).should('not.exist');
            getByDataTestId(`${dataTests.columnVisibility.columnItem}.id`).click();
            assertColumnVisibility(visibleWithoutId);
        });


        it(`uses bulk toggle to show all, hide all, then show all again`, () => {
            cy.mount(<Providers><Component /></Providers>);

            getByDataTest(dataTests.columnVisibility.toggleButton).click();
            getByDataTestId(`${dataTests.columnVisibility.columnItem}.select`).should('not.exist');
            getByDataTestId(`${dataTests.columnVisibility.columnItem}.actions`).should('not.exist');
            getByDataTestId(`${dataTests.columnVisibility.columnItem}.id`).click();
            getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('have.attr', 'data-indeterminate', 'true');
            assertColumnVisibility(visibleWithoutId);

            getByDataTest(dataTests.columnVisibility.toggleAllItem).click();
            getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('be.checked');
            getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('not.have.attr', 'data-indeterminate', 'true');
            assertColumnVisibility(allVisibleColumns);

            getByDataTest(dataTests.columnVisibility.toggleAllItem).click();
            getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('not.be.checked');
            getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('not.have.attr', 'data-indeterminate', 'true');
            assertColumnVisibility(pinnedOnly);

            getByDataTest(dataTests.columnVisibility.toggleAllItem).click();
            getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('be.checked');
            getByDataTest(dataTests.columnVisibility.toggleAllItem).find('input').should('not.have.attr', 'data-indeterminate', 'true');
            assertColumnVisibility(allVisibleColumns);
        });

    });
});

