import api from './api';

export async function buscaSaldo() {
  try {
    const resp = await api.get('/saldo');
    return resp.data.valor;
  } catch (err) {
    return 0;
  }
}

export async function atualizaSaldo(novoSaldo) {
  api.put('/saldo', { valor: novoSaldo })
}
