import instance from 'common/config/api';

const bandeirasService = {
  getById: async (bandeiraIds) => {
    const query = new URLSearchParams();
    bandeiraIds.forEach(id => query.append('id', id));
    
    const response = await instance.get(`/bandeiras?${query.toString()}`);
    return response.data;
  }
}

export default bandeirasService;