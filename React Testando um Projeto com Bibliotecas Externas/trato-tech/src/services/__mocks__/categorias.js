import { CATEGORIAS_MOCKS } from '../../mocks/categorias';

const categoriasService = {
  fetch: async () => CATEGORIAS_MOCKS,
  findCategory: async () => CATEGORIAS_MOCKS[0]
}

export default categoriasService;