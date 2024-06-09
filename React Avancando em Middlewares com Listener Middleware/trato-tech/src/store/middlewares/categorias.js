import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loadCategories, addCategories, loadCategory, addCategory } from '../reducers/categorias';
import categoriasService from 'services/categorias';
import createTask from 'store/utils/createTask';

export const categoriesListener = createListenerMiddleware();

categoriesListener.startListening({
  actionCreator: loadCategories,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const response = await createTask({
      fork,
      dispatch,
      action: addCategories,
      serviceMethod: categoriasService.fetch,
      loadingMessage: 'Carregando Categorias',
      successMessage: 'Categorias carregadas com sucesso!',
      errorMessage: 'Erro na busca das categorias',
    });

    if (response.status === 'ok') unsubscribe();
  }
});

categoriesListener.startListening({
  actionCreator: loadCategory,
  effect: async (action, { dispatch, fork, unsubscribe, getState }) => {
    const { categorias } = getState();
    
    if (categorias.length === 5) return unsubscribe();

    const categoryName = action.payload;
    const loadedCategory = categorias.some(category => category.id === categoryName);

    if (loadedCategory) return;

    await createTask({
      fork,
      dispatch,
      action: addCategory,
      serviceMethod: () => categoriasService.findCategory(categoryName),
      loadingMessage: `Carregando categoria ${categoryName}`,
      successMessage: `Categoria ${categoryName} carregada com sucesso!`,
      errorMessage: `Erro na busca da categoria ${categoryName}`,
    });
  }
});