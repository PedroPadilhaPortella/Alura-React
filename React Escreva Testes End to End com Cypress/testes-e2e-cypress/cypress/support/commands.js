import '@testing-library/cypress/add-commands'

Cypress.Commands.add('getByData', (seletor) => {
  return cy.get(`[data-test="${seletor}"]`);
});

Cypress.Commands.add('checkText', (seletor, texto) => {
  cy.get(`${seletor}`).contains(`${texto}`)
})