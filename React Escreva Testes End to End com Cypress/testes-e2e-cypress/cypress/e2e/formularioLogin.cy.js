describe('Formulario de Login', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Não deve permitir o cadastro de usuários com um email já cadastrado', () => {
    cy.getByData('botao-login').click();
    cy.getByData('email-input').type('gui@email.com');
    cy.getByData('senha-input').type('456789');
    cy.getByData('botao-enviar').click();

    cy.getByData('home-title').should('exist').and('have.text', 'Bem vindo de volta!');
  });

  it('Não deve permitir um email inválido', () => {
    cy.getByData('botao-login').click();

    cy.getByData('email-input').type('neilton@alura');
    cy.getByData('senha-input').type('123456');
    cy.getByData('botao-enviar').click();

    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido');
  });

  it('Não deve permitir um campo em branco', () => {
    cy.getByData('botao-login').click();
    cy.getByData('senha-input').type('123456');
    cy.getByData('botao-enviar').click();
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
  });
})