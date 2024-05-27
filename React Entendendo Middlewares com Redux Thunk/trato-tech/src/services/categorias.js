import instance from 'common/config/api';

const categoriasService = {
  fetch: async () => {
    const response = await instance.get('/categorias');
    return response.data;
  }
}

export default categoriasService;