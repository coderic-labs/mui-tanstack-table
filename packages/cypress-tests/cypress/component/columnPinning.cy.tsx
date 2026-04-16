import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { assertStickyColumnProps, getByDataTest, getByDataTestId } from '../support/utils';

const tableDemos = [
    {
        name: 'ClientSideTable',
        Component: ClientSideTableDemo,
    },
    {
        name: 'ServerSideTable',
        Component: ServerSideTableDemo,
    }
] as const;

const openHeaderOptions = (columnId: string) => {
    getByDataTestId(`${dataTests.table.headerCell}.${columnId}`).within(() => {
        cy.get(`[data-test="${dataTests.header.columnOptionsButton}"]`).click({ force: true });
    });

    getByDataTest(dataTests.header.columnOptionsMenu).should('be.visible');
};

tableDemos.forEach(({ name, Component }) => {

    describe(name, () => {

        it(`renders pinned left and right cells as sticky`, () => {
            cy.mount(<Providers><Component /></Providers>);

            getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'position', 'sticky');
            getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'left', '0px');
            getByDataTestId(`${dataTests.table.dataCell}.1000.actions`).should('have.css', 'position', 'sticky');
            getByDataTestId(`${dataTests.table.dataCell}.1000.actions`).should('have.css', 'right', '0px');
            //chat: also test header and footer sticky positioning
        });

        it('pins and unpins a column using header column options', () => {
            cy.mount(<Providers><Component /></Providers>);

            openHeaderOptions('id');
            getByDataTest(dataTests.header.pinLeftOption).click();

            getByDataTestId(`${dataTests.table.dataCell}.1000.id`)
                .should('have.css', 'position', 'sticky')
                .then(($cell) => {
                    const left = Number.parseFloat($cell.css('left').replace('px', ''));
                    expect(left).to.be.greaterThan(-1);
                });

            openHeaderOptions('id');
            getByDataTest(dataTests.header.unpinOption).click();

            getByDataTestId(`${dataTests.table.dataCell}.1000.id`).should('have.css', 'position', 'static');
        });

        it('applies cumulative left offsets when multiple columns are pinned left', () => {
            cy.mount(<Providers><Component /></Providers>);

            openHeaderOptions('id');
            getByDataTest(dataTests.header.pinLeftOption).click();

            openHeaderOptions('name');
            getByDataTest(dataTests.header.pinLeftOption).click();

            assertStickyColumnProps('select', 0, 'left');
            assertStickyColumnProps('id', 98, 'left');
            assertStickyColumnProps('name', 197, 'left');
        });

        it('re-stacks pinned offsets after hiding a middle pinned column', () => {
            cy.mount(<Providers><Component /></Providers>);

            openHeaderOptions('id');
            getByDataTest(dataTests.header.pinLeftOption).click();

            openHeaderOptions('name');
            getByDataTest(dataTests.header.pinLeftOption).click();

            getByDataTest(dataTests.columnVisibility.toggleButton).click();
            getByDataTestId(`${dataTests.columnVisibility.columnItem}.id`).click();

            getByDataTestId(`${dataTests.table.headerCell}.id`).should('not.exist');
            getByDataTestId(`${dataTests.table.dataCell}.1000.id`).should('not.exist');
            getByDataTestId(`${dataTests.table.footerCell}.id`).should('not.exist');

            assertStickyColumnProps('select', 0, 'left', 1000);
            assertStickyColumnProps('name', 98, 'left', 1000);
        });

        it('applies cumulative right offsets when multiple columns are pinned right', () => {
            cy.mount(<Providers><Component /></Providers>);

            openHeaderOptions('projects');
            getByDataTest(dataTests.header.pinRightOption).click();

            assertStickyColumnProps('projects', 0, 'right');
            assertStickyColumnProps('actions', 182, 'right');
        });

        it('updates stacked pinned positions after dataset/page change', () => {
            cy.mount(<Providers><Component /></Providers>);

            openHeaderOptions('id');
            getByDataTest(dataTests.header.pinLeftOption).click();

            openHeaderOptions('technologies');
            getByDataTest(dataTests.header.pinLeftOption).click();

            openHeaderOptions('name');
            getByDataTest(dataTests.header.pinLeftOption).click();

            assertStickyColumnProps('id', 98, 'left', 1000);
            assertStickyColumnProps('technologies', 197, 'left', 1000);
            assertStickyColumnProps('name', 458, 'left', 1000);

            getByDataTest(dataTests.paginationV2.nextButton).click();
            getByDataTestId(`${dataTests.table.dataCell}.1010.id`).should('exist');

            assertStickyColumnProps('id', 98, 'left', 1010);
            assertStickyColumnProps('technologies', 197, 'left', 1010);
            assertStickyColumnProps('name', 515, 'left', 1010);
        });

    });
});
