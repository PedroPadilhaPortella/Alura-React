import buscaReducer, { mudarBusca, resetarBusca } from './busca';


describe('Busca Reducer', () => {

  test('should change search as espected', () => {
    expect(buscaReducer('', mudarBusca('teste'))).toEqual('teste');
  });

  test('should reset search', () => {
    expect(buscaReducer('something', resetarBusca())).toEqual('');
  });

});