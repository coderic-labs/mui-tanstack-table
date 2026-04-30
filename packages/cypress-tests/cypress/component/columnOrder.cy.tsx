import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { assertColumnOrder, dragAndDropCol, getByDataTest, getByDataTestId } from '../support/utils';

const tableDemos = [
    { name: 'ClientSideTable', Component: ClientSideTableDemo },
    { name: 'ServerSideTable', Component: ServerSideTableDemo },
] as const;

const initialColumnOrder = ['select', 'id', 'name', 'hireDate', 'employmentType', 'technologies', 'projects', 'verified', 'actions'] as const;

// Column centers with enableColumnResizing (fixed layout, columnSizes in px):
//   select=50  id=175  name=335  hireDate=595
// At 25px per arrow press, crossing the midpoint between adjacent columns:
//   name→hireDate: gap=260, half=130 → 6 presses (use 7)
//   name→select (2 left via id, then select): ~6 presses (use 7)
//   id→name: gap=160, half=80 → 4 presses (use 5)

const openHeaderOptions = (columnId: string) => {
    getByDataTestId(`${dataTests.table.headerCell}.${columnId}`).within(() => {
        getByDataTest(dataTests.header.columnOptionsButton).click({ force: true });
    });
    getByDataTest(dataTests.header.columnOptionsMenu).should('be.visible');
};

tableDemos.forEach(({ name, Component }) => {
    describe(name, () => {

        it('changes column order by dragging a column handle', () => {
            cy.mount(<Providers><Component enableColumnResizing /></Providers>);
            assertColumnOrder(initialColumnOrder);

            dragAndDropCol('name', 'right', 7);

            assertColumnOrder(['select', 'id', 'hireDate', 'name', 'employmentType', 'technologies', 'projects', 'verified', 'actions']);
        });

        it('pins a column when dragged onto a pinned column', () => {
            cy.mount(<Providers><Component enableColumnResizing /></Providers>);

            // drag 'name' left past 'id' and onto 'select' (pinned left); need 10 presses to cross midpoint
            dragAndDropCol('name', 'left', 10);

            getByDataTestId(`${dataTests.table.dataCell}.1000.name`).should('have.css', 'position', 'sticky');
        });

        it('unpins a column when dragged onto an unpinned column', () => {
            cy.mount(<Providers><Component enableColumnResizing /></Providers>);

            openHeaderOptions('id');
            getByDataTest(dataTests.header.pinLeftOption).click();
            getByDataTestId(`${dataTests.table.dataCell}.1000.id`).should('have.css', 'position', 'sticky');

            // drag pinned 'id' 1 position right onto unpinned 'name'
            dragAndDropCol('id', 'right', 5);

            getByDataTestId(`${dataTests.table.dataCell}.1000.id`).should('have.css', 'position', 'relative');
        });

        it('column with enablePinning disabled has no drag handle and stays pinned', () => {
            cy.mount(<Providers><Component enableColumnResizing /></Providers>);

            // 'select' has enablePinning: false — no drag handle is rendered so it cannot be reordered
            getByDataTestId(`${dataTests.header.reorderHandle}.select`).should('not.exist');

            // rearranging other columns does not affect its pin state
            dragAndDropCol('id', 'right', 5);
            getByDataTestId(`${dataTests.table.dataCell}.1000.select`).should('have.css', 'position', 'sticky');
        });

    });
});
