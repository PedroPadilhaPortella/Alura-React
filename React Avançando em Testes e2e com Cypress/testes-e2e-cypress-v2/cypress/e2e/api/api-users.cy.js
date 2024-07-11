describe('Realizando requisições para a API', () => {

  context('GET /users', () => {
    it('Deve retornar uma lista de usuários', () => {
      cy.request('GET', 'http://localhost:8000/users')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).length.to.be.greaterThan(1);
        });
    });
  });

  context('GET /users/:userId', () => {
    it('Deve retornar uma unico usuário', () => {
      cy.request({ method: 'GET', url: 'http://localhost:8000/users/40a41438-84a6-4b4d-ae1d-7f1713d0a9fe' })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('nome');
        });
    });

    it('Deve retornar um erro quando o usuário for inválido', () => {
      cy.request({ method: 'GET', url: 'http://localhost:8000/users/invalid-id', failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(404);
          expect(response.body).to.eq('Not Found');
        });
    });
  });

  context('PUT /users/:userId', () => {
    it('Deve atualizar as informações do usuário com sucesso', () => {
      const usuario = { nome: 'Pedro Portella', senha: '123456' };
      cy.request({
        method: 'PUT',
        url: 'http://localhost:8000/users/c691fd15-dcd5-4f24-89da-cdfa3cef9d67',
        body: usuario,
        failOnStatusCode: false,
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.nome).to.eq(usuario.nome);
          expect(response.body.senha).to.eq(usuario.senha);
        });
    });

    it('Deve retornar um erro 404 para um usuário inexistente', () => {
      const usuario = { nome: 'Invalid Name', senha: '123456' };
      cy.request({
        method: 'PUT',
        url: 'http://localhost:8000/users/invalid-user',
        body: usuario,
        failOnStatusCode: false,
      })
        .then((response) => {
          expect(response.status).to.eq(404);
          expect(response.body).to.eq('Not Found');
        });
    });
  });


  context('Interceptando solicitações de rede', () => {
    it('Deve fazer a interceptação do POST users/login', () => {
      cy.intercept('POST', 'users/login').as('loginRequest');
      cy.login('neilton@alura.com', '123456');
      cy.wait('@loginRequest').then((interception) => {
        interception.response = { senhaCode: 200, body: { sucess: true, message: 'Login bem sucedido!' } }
      });

      cy.visit('/home');
      cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!')
    });
  });

  context('Realizando login via API', () => {
    it('Deve permitir o login do usuário Neilton', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/users/login',
        body: Cypress.env(),
      }).then((resposta) => {
        expect(resposta.status).to.eq(200);
        expect(resposta.body).is.not.empty;
        expect(resposta.body.user).to.have.property('nome');
        expect(resposta.body.user.nome).to.be.equal('Neilton');
      });
    });
  });
});