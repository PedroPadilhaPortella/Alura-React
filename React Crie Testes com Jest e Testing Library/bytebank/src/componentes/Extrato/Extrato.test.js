import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Extrato from '.';

describe('Extrato', () => {
  const transacoes = [
    {
      transacao: 'Depósito',
      valor: 100,
      data: '28/06/2024'
    },
  ];

  test('Deve renderizar uma lista de transações', () => {
    render(<Extrato transacoes={transacoes} />);
    const lista = screen.getByRole('listitem');
    expect(lista).toBeInTheDocument();
  });
});