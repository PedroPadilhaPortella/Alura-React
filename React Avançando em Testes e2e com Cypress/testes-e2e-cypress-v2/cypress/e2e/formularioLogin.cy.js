describe('Formulario de Login', () => {

  it('Deve acessar a página home e trazer as informacoes do usuário', () => {
    cy.fixture('usuarios').then((usuarios) => {
      cy.login(usuarios[0].email, usuarios[0].senha);
      cy.visit('/home');

      cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!');
      cy.contains(usuarios[0].nome).should('be.visible');

      cy.getByData('lista-transacoes').find('li').last()
        .contains(usuarios[0].transacoes[usuarios[0].transacoes.length - 1].valor);

      cy.get('[data-testid="saldo"]').contains(usuarios[0].saldo);
    });
  });

  it('Deve acessar a pagina /home após o login', () => {
    cy.login('neilton@alura.com', '123456');
    cy.visit('/home');
    cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!')
  })

  it('Não deve permitir um email inválido', () => {
    cy.visit('/');
    cy.getByData('botao-login').click();
    cy.getByData('email-input').type('neilton@alura');
    cy.getByData('senha-input').type('123456');
    cy.getByData('botao-enviar').click();
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
  })

  it('Não deve permitir um campo em branco', () => {
    cy.visit('/');
    cy.getByData('botao-login').click()
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
  })
})