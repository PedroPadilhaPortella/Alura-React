describe('Jornadas de usuário', () => {

  beforeEach(() => {
    cy.visit('/');
  });


  it('Deve permitir que a pessoa usuária acesse a aplicação, realize uma transação e faça um logout', () => {
    cy.getByData('botao-login').click();
    cy.getByData('email-input').type('gui@email.com');
    cy.getByData('senha-input').type('456789');
    cy.getByData('botao-enviar').click();

    cy.location('pathname').should('eq', '/home');

    cy.getByData('select-opcoes').select('Transferência');
    cy.getByData('form-input').type('80');
    cy.getByData('realiza-transacao').click();

    cy.getByData('lista-transacoes').find('li').last().contains('- R$ 80');

    cy.getByData('botao-sair').click();

    cy.location('pathname').should('eq', '/');
  });

  it('Deve cadastrar um usuário novo, em seguida fazer login desse usuário e ser redirecionado para a home', () => {
    const email = `pedro.${Date.now()}@gmail.com`;
    const senha = 'pedro123';

    cy.getByData('botao-cadastro').click();
    cy.getByData('nome-input').type('Pedro Portella');
    cy.getByData('email-input').type(email);
    cy.getByData('senha-input').type(senha);
    cy.getByData('botao-enviar').click();

    cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!');
    cy.location('pathname').should('eq', '/');

    cy.getByData('botao-login').click();
    cy.getByData('email-input').type(email);
    cy.getByData('senha-input').type(senha);
    cy.getByData('botao-enviar').click();

    cy.location('pathname').should('eq', '/home');
    cy.checkText('[data-test="cabecalho-username"]', 'Olá, Pedro Portella');
  });
});