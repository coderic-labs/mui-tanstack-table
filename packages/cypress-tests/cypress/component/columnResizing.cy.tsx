import { ClientSideTableDemo, ServerSideTableDemo, columnSizes } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { assertColWidth, resizeCol, getByDataTest, getByDataTestId, openHeaderOptions } from '../support/utils';

const tableDemos = [
    { name: 'ClientSideTable', Component: ClientSideTableDemo },
    { name: 'ServerSideTable', Component: ServerSideTableDemo },
] as const;

tableDemos.forEach(({ name, Component }) => {
    describe(name, () => {

        it('resizes an unpinned column', () => {
            cy.mount(<Providers><Component enableColumnResizing /></Providers>);
            assertColWidth('name', columnSizes.name);

            resizeCol('name', 50);

            assertColWidth('name', columnSizes.name + 50);
        });

        it('resizes a pinned column and it stays pinned', () => {
            cy.mount(<Providers><Component enableColumnResizing /></Providers>);

            openHeaderOptions('id');
            getByDataTest(dataTests.header.pinLeftOption).click();
            getByDataTestId(`${dataTests.table.dataCell}.1000.id`).should('have.css', 'position', 'sticky');

            assertColWidth('id', columnSizes.id);
            resizeCol('id', 50);
            assertColWidth('id', columnSizes.id + 50);

            getByDataTestId(`${dataTests.table.dataCell}.1000.id`).should('have.css', 'position', 'sticky');
        });

        it('non-resizable columns have no resize handle', () => {
            cy.mount(<Providers><Component enableColumnResizing /></Providers>);

            getByDataTestId(`${dataTests.header.resizeHandle}.select`).should('not.exist');
            getByDataTestId(`${dataTests.header.resizeHandle}.actions`).should('not.exist');
        });

    });
});
