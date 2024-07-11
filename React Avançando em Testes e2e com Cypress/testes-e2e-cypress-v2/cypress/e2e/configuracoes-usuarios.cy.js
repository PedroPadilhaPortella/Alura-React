describe('Atualização de Dados do Usuário', () => {
  const newUser = {
    nome: 'Neilton',
    senha: '123456',
  };

  it('Deve permitir que o usuário atualize seus dados pessoais', () => {
    cy.fixture('usuarios').then((usuarios) => {
      cy.login(usuarios[0].email, usuarios[0].senha);

      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(usuarios[0].nome).should('be.visible');

      cy.getByData('app-home').find('a').eq(1).click();

      cy.url().should('include', '/minha-conta');

      cy.getByData('botao-salvar-alteracoes').should('be.disabled');

      cy.get('[name = "nome"]').type(newUser.nome);
      cy.get('[name = "senha"]').type(newUser.senha);

      cy.getByData('botao-salvar-alteracoes').should('not.be.disabled');
      cy.getByData('botao-salvar-alteracoes').click();

      cy.on('window:alert', (textoDoAlert) => {
        expect(textoDoAlert).to.equal('Alterações salvas com sucesso!');
      });

      cy.url().should('include', '/home');

      cy.window().then((win) => {
        expect(win.localStorage.getItem('nomeUsuario')).to.equal(newUser.nome);

        const userId = win.localStorage.getItem('userId');

        cy.request('GET', `http://localhost:8000/users/${userId}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.nome).to.be.equal(newUser.nome);
          expect(response.body.senha).to.be.equal(newUser.senha);
        });
      });
    });

  });
});