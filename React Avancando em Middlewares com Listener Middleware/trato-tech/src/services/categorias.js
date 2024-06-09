import instance from 'common/config/api';

const categoriasService = {
  fetch: async () => {
    const response = await instance.get('/categorias');
    return response.data;
  },
  findCategory: async (categoria) => {
    const response = await instance.get(`/categorias/${categoria}`);
    return response.data;
  }
}

export default categoriasService;