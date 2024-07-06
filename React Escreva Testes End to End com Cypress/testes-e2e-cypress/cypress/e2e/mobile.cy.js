describe('Testando dispositivos móveis', () => {

  it('Deve existir um botão menu burguer para dispositivos com resoluções menores que 425px', () => {
    cy.viewport(424, 667);
    cy.visit('/');

    cy.getByData('botao-login').click();
    cy.getByData('email-input').type('neilton@alura.com');
    cy.getByData('senha-input').type('123456');
    cy.getByData('botao-enviar').click();

    cy.location('pathname').should('eq', '/home');

    cy.getByData('menu-burguer').click();
    cy.getByData('menu-lateral').find('a').eq(3).click();

    cy.location('pathname').should('eq', '/home/investimentos');
  });
});

describe('Menu de navegação burguer icon', () => {

  context('Resolução do iPhone XR', () => {
    beforeEach(() => {
      cy.viewport('iphone-xr');
    });

    it('Deve existir um botão menu burguer', () => {
      cy.visit('/');

      cy.getByData('botao-login').click();
      cy.getByData('email-input').type('neilton@alura.com');
      cy.getByData('senha-input').type('123456');
      cy.getByData('botao-enviar').click();

      cy.location('pathname').should('eq', '/home');

      cy.getByData('menu-burguer').should('be.visible');
    });
  });

  context('Resolução do MackBook 13 ', () => {
    beforeEach(() => {
      cy.viewport('macbook-13');
    });

    it('Não deve existir um botão menu burguer', () => {
      cy.visit('/');

      cy.getByData('botao-login').click();
      cy.getByData('email-input').type('neilton@alura.com');
      cy.getByData('senha-input').type('123456');
      cy.getByData('botao-enviar').click();

      cy.location('pathname').should('eq', '/home');

      cy.getByData('menu-burguer').should('not.be.visible');
    });
  });
});