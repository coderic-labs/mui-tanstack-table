import { ClientSideTableDemo, ServerSideTableDemo } from '@demo-components';
import { dataTests } from '@coderic-labs/mui-tanstack-table';
import { Providers } from '../support/providers';
import { getByDataTest, getByDataTestId, openHeaderOptions } from '../support/utils';

const tableDemos = [
    { name: 'ClientSideTable', Component: ClientSideTableDemo },
    { name: 'ServerSideTable', Component: ServerSideTableDemo },
] as const;

const themes = ['light', 'dark'] as const;

tableDemos.forEach(({ name, Component }) => {

    describe(name, () => {

        themes.forEach((mode) => {
            it(`Should match snapshots [${mode}]`, () => {
                cy.viewport(1200, 900);

                cy.mount(
                    <Providers mode={mode}>
                        <Component highlightRow="1050" />
                    </Providers>
                );

                // Sort by name ascending (name has explicit sortingFn: 'alphanumeric')
                getByDataTestId(`${dataTests.table.headerCell}.name`)
                    .find(`[data-test="${dataTests.header.sortLabel}"]`)
                    .click();

                // Pin "name" left (alongside already-pinned "select")
                openHeaderOptions('name');
                getByDataTest(dataTests.header.pinLeftOption).click();

                // Pin "technologies" right (alongside already-pinned "actions")
                // openHeaderOptions uses force:true so it works even when off-screen
                openHeaderOptions('technologies');
                getByDataTest(dataTests.header.pinRightOption).click();

                // Expand the first visible row
                getByDataTest(dataTests.table.dataRow).first().within(() => {
                    getByDataTest(dataTests.rowExpansion.rowToggleButton).click();
                });

                // Select the second visible row (distinct from the expanded one)
                getByDataTest(dataTests.table.dataRow).eq(1).within(() => {
                    getByDataTest(dataTests.rowSelection.rowCheckbox).click();
                });

                // Scroll table container 15 px right + 15 px down to exercise sticky z-index stacking
                getByDataTest(dataTests.table.root).parent().scrollTo(25, 25, { ensureScrollable: false });

                getByDataTest('table-demo').matchImageSnapshot(`${name}-${mode}`);
            });
        });

    });
});
