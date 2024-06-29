import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from '.';

describe('Formulario', () => {
  test('Deve renderizar um input numerico', () => {
    render(<Formulario />);
    const textField = screen.getByPlaceholderText('Digite um valor');
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveAttribute('type', 'number');
  });

  test('Deve renderizar um input que pode ser preenchido', () => {
    render(<Formulario />);
    const textField = screen.getByPlaceholderText('Digite um valor');
    userEvent.type(textField, '50');
    expect(textField).toHaveValue(50);
  });

  test('Deve emitir um evento de onSubmit ao clicar em Realizar Transação', () => {
    const realizarTransacao = jest.fn();
    render(<Formulario realizarTransacao={realizarTransacao} />);
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    expect(realizarTransacao).toHaveBeenCalledTimes(1);
  });

  test('Deve ser possível selecionar uma opção do elemento <select/>', () => {
    render(<Formulario />);
    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, ['Depósito']);

    expect(screen.getByRole('option', { name: 'Selecione um tipo de transação' }).selected).toBe(false);

    expect(screen.getByRole('option', { name: 'Depósito' }).selected).toBe(true);
  });
})