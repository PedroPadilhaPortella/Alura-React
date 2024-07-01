import { act, renderHook } from '@testing-library/react';
import { buscaSaldo } from '../services/saldo';
import useSaldo from './useSaldo';

jest.mock('../services/saldo');

describe('useSaldo Hook', () => {
  test('Deve retornar o saldo e uma função que a atualiza o saldo', async () => {
    buscaSaldo.mockImplementation(() => 100);

    const { result } = renderHook(() => useSaldo());
    expect(result.current[0]).toEqual(0);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(100);
  });
});