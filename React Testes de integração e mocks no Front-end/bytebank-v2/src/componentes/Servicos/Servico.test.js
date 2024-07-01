import { screen, render } from '@testing-library/react';
import icones from './icones.json';
import Servicos from '.';

describe('Servicos', () => {
  test('should render the component', () => {
    render(<Servicos />);

    icones.forEach((icone) => {
      expect(screen.getByText(icone.servico)).toBeInTheDocument();
      expect(screen.getByAltText(icone.servico)).toBeInTheDocument();
    });
  });
});