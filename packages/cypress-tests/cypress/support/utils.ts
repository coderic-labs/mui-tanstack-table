export const getByDataTest = (value: string) =>
	cy.get(`[data-test="${value}"]`);

export const getByDataTestId = (value: string) =>
	cy.get(`[data-testid="${value}"]`);
