import { configureStore } from '@reduxjs/toolkit';
import buscaSlice from './reducers/busca';
import carrinhoSlice from './reducers/carrinho';
import categoriasSlice from './reducers/categorias';
import itensSlice from './reducers/itens';
import { categoriesListener } from './middlewares/categorias';
import { itemsListener } from './middlewares/itens';

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .prepend(categoriesListener.middleware, itemsListener.middleware),
});

export default store;