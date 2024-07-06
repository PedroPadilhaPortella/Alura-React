describe('Página inicial', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Deve renderizar o h1 com o texto correto', () => {
    cy.get('[data-test="titulo-principal"]').contains(
      'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!'
    );
  });

  it('Deve renderizar corretamente o texto da seção de vantagens ', () => {
    cy.checkText('[data-test="descricao-vantagens"]', 'Vantagens do nosso banco:');
  });
});