import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createStandaloneToast } from '@chakra-ui/toast';
import categoriasService from 'services/categorias';
import { resetarCarrinho } from './carrinho';

const { toast } = createStandaloneToast();

const initialState = [];

export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  categoriasService.fetch
);

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      fetchCategories.fulfilled,
      (state, { payload }) => {
        toast({
          title: 'Sucesso!',
          description: 'Categorias carregadas com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true
        });
        return payload;
      }
    )
    .addCase(
      fetchCategories.pending,
      (state, { payload }) => {
        toast({
          title: 'Carregando',
          description: 'Carregando categorias',
          status: 'loading',
          duration: 2000,
          isClosable: true
        });
      }
    )
    .addCase(
      fetchCategories.rejected,
      (state, { payload }) => {
        toast({
          title: 'Erro',
          description: 'Erro na busca de categorias',
          status: 'error',
          duration: 2000,
          isClosable: true
        });
      }
    )
    .addCase(
      resetarCarrinho.type,
      () => {
        toast({
          title: 'Sucesso!',
          description: 'Compra finalizada com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true
        });
      }
    );
  }
});

export default categoriasSlice.reducer;