import { configureStore } from '@reduxjs/toolkit';
import buscaSlice from './reducers/busca';
import carrinhoSlice from './reducers/carrinho';
import categoriasSlice from './reducers/categorias';
import itensSlice from './reducers/itens';
import usuarioSlice from './reducers/usuario';
import { categoriesListener } from './middlewares/categorias';
import { itemsListener } from './middlewares/itens';
import createSagaMiddleware from 'redux-saga';
import { categoriesSaga } from './sagas/categorias';
import { carrinhoSaga } from './sagas/carrinho';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
    usuario: usuarioSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .prepend(categoriesListener.middleware, itemsListener.middleware, sagaMiddleware),
});

sagaMiddleware.run(categoriesSaga);
sagaMiddleware.run(carrinhoSaga);

export default store;