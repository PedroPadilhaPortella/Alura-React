import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { createStandaloneToast } from '@chakra-ui/toast';
import categoriasService from 'services/categorias';
import { resetarCarrinho } from './carrinho';

const { toast } = createStandaloneToast();

const initialState = [];

export const loadCategories = createAction('loadCategories');

export const loadCategory = createAction('loadCategory');

export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  categoriasService.fetch
);

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    addCategories: (state, { payload }) => {
      return payload;
    },
    addCategory: (state, { payload }) => {
      state.push(payload);
    }
  },
  extraReducers: (builder) => {
    builder
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

export const { addCategories, addCategory } = categoriasSlice.actions;

export default categoriasSlice.reducer;