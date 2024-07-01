import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../paginas/Principal/App';
import { buscaTransacoes, salvaTransacao } from './transacoes';
import api from './api';
import { buscaSaldo, atualizaSaldo } from './saldo';

jest.mock('./api');

describe('API Requisitions', () => {

  const mockErrorRequest = () => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject({ status: 400 });
      }, 250);
    })
  };

  beforeEach(() => {
    api.get.mockClear();
  });

  describe('Transações API', () => {
    const mockTransaction = [
      { id: 1, transacao: 'Depósito', valor: '100', data: '18/11/2022', mes: 'Novembro' },
      { id: 2, transacao: 'Tranferência', valor: '50', data: '19/11/2022', mes: 'Novembro' },
      { id: 3, transacao: 'Depósito', valor: '400', data: '20/11/2022', mes: 'Novembro' },
    ];

    const mockSuccessRequest = (response) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: response });
        }, 250);
      })
    };

    const mockSuccessPostRequest = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: 201 });
        }, 250);
      });
    };

    test('deve retornar uma lista de transações quando a requisição for bem sucedida', async () => {
      api.get.mockImplementation(() => mockSuccessRequest(mockTransaction));

      const transacoes = await buscaTransacoes();
      expect(transacoes).toHaveLength(3);
      expect(transacoes).toEqual(mockTransaction);
      expect(api.get).toHaveBeenCalledWith('/transacoes');

      render(<App />, { wrapper: BrowserRouter });
      const transacoesEl = await screen.findAllByText('Novembro');
      transacoesEl.forEach((transacao) => expect(transacao).toBeInTheDocument());
    });

    test('deve retornar uma lista vazia quando a requisição falhar', async () => {
      api.get.mockImplementation(() => mockErrorRequest());

      const transacoes = await buscaTransacoes();
      expect(transacoes).toHaveLength(0);
      expect(transacoes).toEqual([]);
      expect(api.get).toHaveBeenCalledWith('/transacoes');
    });

    test('deve retornar um status 201 - (Created) após uma requisição POST', async () => {
      api.post.mockImplementation(() => mockSuccessPostRequest());

      const status = await salvaTransacao(mockTransaction[0]);
      expect(status).toBe(201);
      expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransaction[0]);
    });

    test('deve retornar a mensagem "Erro na requisição" após uma requisição POST falhar', async () => {
      api.post.mockImplementation(() => mockErrorRequest());

      const status = await salvaTransacao(mockTransaction[0]);
      expect(status).toBe('Erro na requisição');
      expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransaction[0]);
    });
  });

  describe('Saldo API', () => {
    const mockSuccessRequest = (response) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: response });
        }, 200);
      })
    };

    const mockSuccessPutRequest = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: 200 });
        }, 250);
      });
    };

    test('deve retornar o saldo quando a requisição for bem sucedida', async () => {
      api.get.mockImplementation(() => mockSuccessRequest({ valor: 100 }));

      const saldo = await buscaSaldo();
      expect(saldo).toEqual(100);
      expect(api.get).toHaveBeenCalledWith('/saldo');
    });

    test('deve retornar um saldo de 0 quando a requisição falhar', async () => {
      api.get.mockImplementation(() => mockErrorRequest());

      const saldo = await buscaSaldo();
      expect(saldo).toEqual(0);
      expect(api.get).toHaveBeenCalledWith('/saldo');
    });

    test('não deve retornar nada após uma requisição PUT bem sucedida', async () => {
      api.put.mockImplementation(() => mockSuccessPutRequest());

      await atualizaSaldo(100);
      expect(api.put).toHaveBeenCalledWith('/saldo', { valor: 100 });
    });

    test('deve retornar erro após uma requisição PUT falhar', async () => {
      api.put.mockImplementation(() => mockErrorRequest());

      await atualizaSaldo(100);
      expect(api.put).toHaveBeenCalledWith('/saldo', { valor: 100 });
    });
  });
});