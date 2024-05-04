import { act, fireEvent, render, screen } from "@testing-library/react";
import Formulario from ".";
import { RecoilRoot } from "recoil";

describe('Formulario', () => {

  test('should not add a participant when the form in empty', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')

    expect(input).toBeInTheDocument()
    expect(botao).toBeDisabled()
  });

  test('should add a participant when the form in filled', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')

    fireEvent.change(input, { target: { value: 'Pedro' } });
    fireEvent.click(botao);

    expect(input).toHaveFocus();
    expect(input).toHaveValue('');
  });

  test('should not add a participant when there is duplicated names', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')

    fireEvent.change(input, { target: { value: 'Pedro' } });
    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: 'Pedro' } });
    fireEvent.click(botao);

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.textContent).toBe('Nomes duplicados não são permitidos!')
  });

  test('the error message should disapear after 3 seconds', () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')

    fireEvent.change(input, { target: { value: 'Pedro' } });
    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: 'Pedro' } });
    fireEvent.click(botao);

    let errorMessage = screen.queryByRole('alert')
    expect(errorMessage).toBeInTheDocument();

    act(() => {
      jest.runAllTimers()
    });

    errorMessage = screen.queryByRole('alert')
    expect(errorMessage).toBeNull()
  });
});