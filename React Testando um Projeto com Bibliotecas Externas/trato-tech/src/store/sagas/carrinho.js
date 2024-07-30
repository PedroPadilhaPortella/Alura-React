import { call, takeLatest, put, takeEvery, delay, select } from 'redux-saga/effects';
import bandeirasService from 'services/bandeiras';
import cartoesService from 'services/cartoes';
import usuariosService from 'services/usuarios';
import { loadPayment, mudarCarrinho, mudarQuantidade, mudarTotal, finishPayment, resetarCarrinho } from 'store/reducers/carrinho';
import { addUser } from 'store/reducers/usuario';
import { createStandaloneToast } from '@chakra-ui/toast';

const { toast } = createStandaloneToast();

const usuarioLogado = 2;

function* loadPaymentsSaga() {
  try {
    const usuario = yield call(usuariosService.getById, usuarioLogado);

    const cartoes = yield call(cartoesService.getByUserId, usuarioLogado);

    const bandeiraIds = cartoes.map(cartao => cartao.bandeiraId);

    const bandeiras = yield call(bandeirasService.getById, bandeiraIds);

    const cartoesComBandeiras = cartoes.map(cartao => {
      const bandeiraDoCartao = bandeiras.find(bandeira => +bandeira.id === cartao.bandeiraId);
      return { ...cartao, taxa: bandeiraDoCartao.taxa, bandeira: bandeiraDoCartao.nome };
    });

    yield put(addUser({ ...usuario, cartoes: cartoesComBandeiras }));
  } catch (error) {
    console.log('An Error ocurred:', error);
  }
}

function* calculateTotalSaga() {
  yield delay(500);

  const state = yield select();

  const total = state.carrinho.data.reduce((total, itemNoCarrinho) => {
    const item = state.itens.find(i => i.id === itemNoCarrinho.id);
    return total + (item.preco * itemNoCarrinho.quantidade);
  }, 0);

  yield put(mudarTotal(total));
}

function* finishPaymentSaga({ payload  }) {
  console.log(payload)
  const { valorTotal, paymentMethod } = payload;

  if (valorTotal > paymentMethod.saldo) {
    return yield toast({
      title: 'Erro',
      description: 'Saldo insuficiente',
      status: 'error',
      duration: 2000,
      isClosable: true
    });
  } else {
    yield toast({
      title: 'Sucesso!',
      description: 'Compra realizada com sucesso!',
      status: 'success',
      duration: 2000,
      isClosable: true
    });

    yield put(resetarCarrinho());
  }
}

export function* carrinhoSaga() {
  yield takeLatest(loadPayment, loadPaymentsSaga);
  yield takeEvery([mudarQuantidade, mudarCarrinho], calculateTotalSaga);
  yield takeLatest(finishPayment, finishPaymentSaga);
}