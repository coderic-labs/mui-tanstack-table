import { dataTests } from '@coderic-labs/mui-tanstack-table';

export const getByDataTest = (value: string) =>
    cy.get(`[data-test="${value}"]`);

export const getByDataTestId = (value: string) =>
    cy.get(`[data-testid="${value}"]`);

type PinSide = 'left' | 'right';

const parsePxValue = (value: string) => Number.parseFloat(value.replace('px', ''));

export const assertStickyColumnProps = (
    columnId: string,
    expectedOffsetPx: number,
    side: PinSide,
    rowId: string | number = 1000,
) => {
    getByDataTestId(`${dataTests.table.headerCell}.${columnId}`)
        .last()
        .should('have.css', 'position', 'sticky')
        .should('have.css', 'z-index', '3')
        .then(($headerCell) => {
            const offsetValue = $headerCell.css(side);
            const offset = Math.round(parsePxValue(offsetValue));
            expect(Number.isFinite(offset), `numeric header offset for ${columnId}`).to.equal(true);
            expect(offset, `header ${side} for ${columnId}`).to.equal(expectedOffsetPx);
        });

    getByDataTestId(`${dataTests.table.dataCell}.${rowId}.${columnId}`)
        .should('have.css', 'position', 'sticky')
        .should('have.css', 'z-index', '1')
        .then(($bodyCell) => {
            const offsetValue = $bodyCell.css(side);
            const offset = Math.round(parsePxValue(offsetValue));
            expect(Number.isFinite(offset), `numeric body offset for ${columnId}`).to.equal(true);
            expect(offset, `body ${side} for ${columnId}`).to.equal(expectedOffsetPx);
        });

    getByDataTestId(`${dataTests.table.footerCell}.${columnId}`)
        .last()
        .should('have.css', 'position', 'sticky')
        .should('have.css', 'z-index', '3')
        .then(($footerCell) => {
            const offsetValue = $footerCell.css(side);
            const offset = Math.round(parsePxValue(offsetValue));
            expect(Number.isFinite(offset), `numeric footer offset for ${columnId}`).to.equal(true);
            expect(offset, `footer ${side} for ${columnId}`).to.equal(expectedOffsetPx);
        });
};

export const assertRowsRenderedInOrder = (rowIds: readonly (string | number)[]) => {
    getByDataTest(dataTests.table.dataRow).should('have.length.at.least', rowIds.length);

    rowIds.forEach((rowId, index) => {
        getByDataTest(dataTests.table.dataRow)
            .eq(index)
            .should('have.attr', 'data-testid', `${dataTests.table.dataRow}.${rowId}`);
    });
};

export const assertPaginationLabel = (expectedLabel: string) => {
    getByDataTest(dataTests.paginationV2.root).within(() => {
        cy.get('p').contains(expectedLabel).should('exist');
    });
};

export const assertCurrentTableRowsSelected = (rowIds: readonly (string | number)[]) => {
    rowIds.forEach((rowId) => {
        getByDataTestId(`${dataTests.table.dataRow}.${rowId}`).within(() => {
            getByDataTest(dataTests.rowSelection.rowCheckbox).find('input').should('be.checked');
        });
    });
};

export const assertSelectedRowsLabel = (selectedCount: number, totalCount: number) => {
    getByDataTest(dataTests.results.label)
        .first()
        .should('have.text', `Results: ${selectedCount} / ${totalCount}`);
};

export const allColumns = ['select', 'id', 'name', 'hireDate', 'employmentType', 'technologies', 'projects', 'verified', 'actions'] as const;

export const assertColumnOrder = (expectedOrder: readonly string[]) => {
    getByDataTest(dataTests.table.headerCell).then($cells => {
        const actualIds = Array.from($cells)
            .map(el => (el.getAttribute('data-testid') ?? '').replace(`${dataTests.table.headerCell}.`, ''))
            .filter(id => id !== '');
        expect(actualIds).to.deep.equal([...expectedOrder]);
    });
};

// Drag a column handle using keyboard: focuses the handle, presses Space to pick up,
// then presses the arrow key `times` times, then presses Space to drop.
export const dragAndDropCol = (columnId: string, direction: 'left' | 'right', times: number) => {
    const arrowKey = direction === 'left' ? '{leftarrow}' : '{rightarrow}';
    getByDataTestId(`${dataTests.header.reorderHandle}.${columnId}`)
        .first()
        .focus()
        .type(`{enter}${arrowKey.repeat(times)}{enter}`);
};

export const assertColWidth = (columnId: string, expectedPx: number) => {
    getByDataTestId(`${dataTests.table.headerCell}.${columnId}`)
        .last()
        .should($cell => {
            expect(Math.round($cell[0].getBoundingClientRect().width)).to.equal(expectedPx);
        });
};

// Resize a column by simulating mousedown on its resize handle then a mousemove on the document.
// deltaX is the number of pixels to add (positive = wider, negative = narrower).
// mousemove/mouseup are dispatched via .then() so React flushes the mousedown state (startSize)
// before the move handler runs — otherwise TanStack divides by startSize=null and ignores the delta.
export const resizeCol = (columnId: string, deltaX: number) => {
    getByDataTestId(`${dataTests.header.resizeHandle}.${columnId}`)
        .first()
        .trigger('mousedown', { clientX: 0, force: true });
    cy.document().then(doc => {
        doc.dispatchEvent(new MouseEvent('mousemove', { clientX: deltaX, bubbles: true, cancelable: true }));
        doc.dispatchEvent(new MouseEvent('mouseup', { clientX: deltaX, bubbles: true, cancelable: true }));
    });
};

export const assertColumnVisibility = (visibleColumns: readonly string[]) => {
    const visibleSet = new Set(visibleColumns);

    allColumns.forEach((columnId) => {
        const selector = `${dataTests.table.headerCell}.${columnId}`;
        if (visibleSet.has(columnId)) {
            getByDataTestId(selector).should('exist');
            return;
        }
        getByDataTestId(selector).should('not.exist');
    });
};

export const openHeaderOptions = (columnId: string) => {
    getByDataTestId(`${dataTests.table.headerCell}.${columnId}`).within(() => {
        getByDataTest(dataTests.header.columnOptionsButton).click({ force: true });
    });
    getByDataTest(dataTests.header.columnOptionsMenu).should('be.visible');
};
