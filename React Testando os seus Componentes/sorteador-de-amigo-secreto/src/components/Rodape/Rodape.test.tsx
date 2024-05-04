import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Rodape from ".";
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('react-router-dom', () => {
  return { useNavigate: () => mockNavegacao }
});

jest.mock('../../state/hooks/useSorteador', () => {
  return { useSorteador: () => mockSorteio }
});

jest.mock('../../state/hooks/useListaParticipantes', () => {
  return { useListaParticipantes: jest.fn() }
});

describe('quando não existem participantes suficientes', () => {

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  });

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    expect(botao).toBeDisabled();
  });
});

describe('quando existem participantes suficientes', () => {
  const participantes = ['Ana', 'Catarina', 'Maria']

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
  });

  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    expect(botao).not.toBeDisabled();
  });

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    expect(mockNavegacao).toHaveBeenCalledTimes(1)
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  })
});