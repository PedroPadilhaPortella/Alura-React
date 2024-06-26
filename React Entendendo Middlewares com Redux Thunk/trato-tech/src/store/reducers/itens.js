import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createStandaloneToast } from '@chakra-ui/toast';
import itensService from 'services/itens';
import { v4 as uuid } from 'uuid';

const { toast } = createStandaloneToast();

const initialState = [];

export const fetchItems = createAsyncThunk(
  'fetchItems',
  itensService.fetch
);

const itensSlice = createSlice({
  name: 'itens',
  initialState,
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    cadastrarItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    mudarItem: (state, { payload }) => {
      const index = state.findIndex(item => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deletarItem: (state, { payload }) => {
      const index = state.findIndex(item => item.id === payload);
      state.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchItems.fulfilled,
      (state, { payload }) => {
        toast({
          title: 'Sucesso!',
          description: 'Itens carregadas com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
        return payload;
      }
    )
    .addCase(
      fetchItems.pending,
      (state, { payload }) => {
        toast({
          title: 'Carregando',
          description: 'Carregando itens',
          status: 'loading',
          duration: 2000,
          isClosable: true
        })
      }
    )
    .addCase(
      fetchItems.rejected,
      (state, { payload }) => {
        toast({
          title: 'Erro',
          description: 'Erro na busca de itens',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
      }
    );
  }
});

export const { mudarFavorito, cadastrarItem, mudarItem, deletarItem } = itensSlice.actions;

export default itensSlice.reducer;