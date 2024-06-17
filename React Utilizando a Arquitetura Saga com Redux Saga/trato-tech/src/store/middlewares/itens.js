import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addItems } from '../reducers/itens';
import { loadCategory } from '../reducers/categorias';
import itensService from 'services/itens';
import createTask from 'store/utils/createTask';

export const itemsListener = createListenerMiddleware();

itemsListener.startListening({
  actionCreator: loadCategory,
  effect: async (action, { dispatch, fork, getState, unsubscribe }) => {
    const { itens } = getState();
    
    if (itens.length === 25) return unsubscribe();

    const categoryName = action.payload;
    const loadedItems = itens.some(item => item.categoria === categoryName);

    if (loadedItems) return;

    await createTask({
      fork,
      dispatch,
      action: addItems,
      serviceMethod: () => itensService.fetchFromCategory(categoryName),
      loadingMessage: `Carregando Itens da Categoria ${categoryName}`,
      successMessage: `Itens da categoria ${categoryName} carregadas com sucesso!`,
      errorMessage: 'Erro na busca das Itens',
    });
  }
});
