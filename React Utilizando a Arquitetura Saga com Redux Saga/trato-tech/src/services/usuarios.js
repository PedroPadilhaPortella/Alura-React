import instance from 'common/config/api';

const usuariosService = {
  getById: async (id) => {
    const response = await instance.get(`/usuarios/${id}`);
    return response.data;
  }
}

export default usuariosService;