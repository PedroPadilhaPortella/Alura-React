import instance from 'common/config/api';

const cartoesService = {
  getByUserId: async (userId) => {
    const response = await instance.get(`/cartoes?usuarioId=${userId}`);
    return response.data;
  }
}

export default cartoesService;