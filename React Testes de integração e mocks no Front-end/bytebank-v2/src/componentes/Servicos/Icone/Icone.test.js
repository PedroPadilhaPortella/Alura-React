import { screen, render } from '@testing-library/react';
import Icone from '.';
describe('Icone', () => {
  test('should render the component', () => {
    const icone = {
      servico: "Meus cartões",
      imagem: "/imagens/icones/cartao.svg"
    };

    render(<Icone icone={icone} estilos={{}} />);

    expect(screen.getByText(icone.servico)).toBeInTheDocument();
    expect(screen.getByAltText(icone.servico)).toBeInTheDocument();
  });
});