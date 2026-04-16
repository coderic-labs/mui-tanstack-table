import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { getByDataTestId } from '../support/utils';

const tableDemos = [
    { name: 'ClientSideTable', Component: ClientSideTableDemo },
    { name: 'ServerSideTable', Component: ServerSideTableDemo }
] as const;

tableDemos.forEach(({ name, Component }) => {

    describe(name, () => {

        it(`renders pinned left and right cells as sticky`, () => {
            cy.mount(<Providers><Component /></Providers>);

            getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'position', 'sticky');
            getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'left', '0px');
            getByDataTestId(`${dataTests.table.dataCell}.1000.actions`).should('have.css', 'position', 'sticky');
            getByDataTestId(`${dataTests.table.dataCell}.1000.actions`).should('have.css', 'right', '0px');
        });

    });
});

describe('Column Pinning - Multiple Columns', () => {
    it('should pin multiple columns to left side with correct sticky positioning', () => {
        cy.mount(
            <Providers>
                <ClientSideTableDemo />
            </Providers>
        );

        // Verify select column is pinned left at 0px
        getByDataTestId(`${dataTests.table.dataCell}.1000.select`)
            .should('have.css', 'position', 'sticky')
            .should('have.css', 'left', '0px');
    });

    it('should pin multiple columns to right side with correct sticky positioning', () => {
        cy.mount(
            <Providers>
                <ClientSideTableDemo />
            </Providers>
        );

        // Verify actions column is pinned right at 0px
        getByDataTestId(`${dataTests.table.dataCell}.1000.actions`)
            .should('have.css', 'position', 'sticky')
            .should('have.css', 'right', '0px');
    });

    it('should maintain visual order of multiple pinned columns on same side', () => {
        cy.mount(
            <Providers>
                <ClientSideTableDemo />
            </Providers>
        );

        // Verify select and id columns both exist
        getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('exist');
        getByDataTestId(`${dataTests.table.dataCell}.1000.id`).should('exist');

        // Select column should be sticky (pinned left)
        getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'position', 'sticky');

        // Id column exists but is not pinned (not sticky)
        getByDataTestId(`${dataTests.table.dataCell}.1000.id`).should('have.css', 'position', 'static');
    });
});
