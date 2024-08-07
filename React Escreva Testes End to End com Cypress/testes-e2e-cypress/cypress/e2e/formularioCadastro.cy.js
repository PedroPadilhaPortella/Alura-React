describe('Formulário Cadastro', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Usuário deve conseguir se cadastrar com sucesso', () => {
    cy.getByData('botao-cadastro').click();
    cy.getByData('nome-input').type('Gui Lima');
    cy.getByData('email-input').type(`gui${Date.now()}@email.com`);
    cy.getByData('senha-input').type('456789');
    cy.getByData('botao-enviar').click();

    cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!');
  });

  it('Não deve permitir o cadastro de usuários com um email já cadastrado', () => {
    cy.getByData('botao-cadastro').click();
    cy.getByData('nome-input').type('Gui Lima');
    cy.getByData('email-input').type('gui@email.com');
    cy.getByData('senha-input').type('456789');
    cy.getByData('botao-enviar').click();

    cy.getByData('mensagem-erro').should('exist').and('have.text', 'E-mail já cadastrado!');
  });

  it('Não deve permitir o cadastro de usuários sem o campo nome preenchido', () => {
    cy.getByData('botao-cadastro').click();
    cy.getByData('email-input').type('moni@alura.com');
    cy.getByData('senha-input').type('987654');
    cy.getByData('botao-enviar').click();

    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo de nome é obrigatório')
  });
})