import axios from 'axios';
import { history } from "../App";
import { ICategoria } from '../interfaces/ICategoria';
import { ILivro } from '../interfaces/ILivro';
import { IAuthor } from '../interfaces/IAuthor';

const http = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { Accept: 'application/json', Content: 'application/json' }
});

http.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, function (error) {
  console.log('erro no interceptor do axios')
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response?.status === 401) {
    history.push('/');
    return Promise.reject();
  }
  return Promise.reject(error);
});


export default http;

export const getCategoryBySlug = async (slug: string) => {
  const response = await http.get<ICategoria[]>('categorias', { params: { slug } });
  return response.data[0];
}

export const getBooks = async (type: string) => {
  return (await http.get<ILivro[]>(`public/${type}`)).data;
}

export const getBooksByCategory = async (categoria: ICategoria) => {
  return (await http.get<ILivro[]>(`livros`, { params: { categoria: categoria.id } })).data;
}

export const getBookBySlug = async (slug: string) => {
  const response = await http.get<ILivro[]>('livros', { params: { slug } })
  return (response.data.length === 0) ? null : response.data[0];
}

export const getAuthor = async (authorId: number) => {
  try {
    return (await http.get<IAuthor>(`autores/${authorId}`)).data;
  } catch (error) {
    console.log('Não foi possivel obter o autor!')
  }
}
