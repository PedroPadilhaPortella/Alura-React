import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Transacao from '.';
import estilos from '../Extrato.module.css';

describe('Transacao', () => {
  const transacao1 = {
    transacao: 'Depósito',
    valor: 100,
    data: '28/06/2024'
  };

  const transacao2 = {
    transacao: 'Transferência',
    valor: 200,
    data: '29/06/2024'
  };

  test('Deve renderizar transação com as props atualizadas', () => {
    const { rerender } = render(<Transacao estilos={estilos} transacao={transacao1} />);
    let tipoTransacao = screen.getByTestId('tipoTransacao');
    let valorTransacao = screen.getByTestId('valorTransacao');

    expect(tipoTransacao).toHaveTextContent('Depósito');
    expect(valorTransacao).toHaveTextContent('R$ 100');

    rerender(<Transacao estilos={estilos} transacao={transacao2} />);

    tipoTransacao = screen.getByTestId('tipoTransacao');
    valorTransacao = screen.getByTestId('valorTransacao');

    expect(tipoTransacao).toHaveTextContent('Transferência');
    expect(valorTransacao).toHaveTextContent('- R$ 200');
  });
});