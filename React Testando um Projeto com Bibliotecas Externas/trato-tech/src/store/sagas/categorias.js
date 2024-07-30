import { createStandaloneToast } from '@chakra-ui/toast';
import { call, delay, put, takeLatest, take, cancel } from 'redux-saga/effects';
import categoriasService from 'services/categorias';
import { addCategories, loadCategories } from '../reducers/categorias';

const { toast } = createStandaloneToast();

export function* observeCategories() {
  const loadingMessage = 'Carregando Categorias';
  const successMessage = 'Categorias carregadas com sucesso!';
  const errorMessage = 'Erro na busca das categorias';

  toast({
    title: 'Carregando',
    description: loadingMessage,
    status: 'loading',
    duration: 2000,
    isClosable: true
  });

  try {
    yield delay(1000);
    const categorias = yield call(categoriasService.fetch);
    yield put(addCategories(categorias));

    toast({
      title: 'Sucesso!',
      description: successMessage,
      status: 'success',
      duration: 2000,
      isClosable: true
    });
  } catch (error) {
    toast({
      title: 'Erro',
      description: errorMessage,
      status: 'error',
      duration: 2000,
      isClosable: true
    });
  }
}

export function* categoriesSaga() {
  const task = yield takeLatest(loadCategories, observeCategories);
  yield take(addCategories);
  yield cancel(task);
}