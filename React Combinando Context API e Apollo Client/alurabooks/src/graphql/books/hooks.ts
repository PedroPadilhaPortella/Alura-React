import { useQuery, useReactiveVar } from "@apollo/client";
import { ILivro, LivrosEmDestaque } from "../../interfaces/ILivro";
import { GET_BOOK, GET_BOOKS, GET_HIGHLIGHTED_BOOKS } from "./queries";
import { booksFilterVar, livrosEmDestaqueVar, livrosVar } from "./state";

export const useLivros = () => {
  const filtro = useReactiveVar(booksFilterVar);

  return useQuery<{ livros: ILivro[] }>(GET_BOOKS, {
    variables: { categoriaId: filtro.categoria?.id, titulo: filtro.titulo },
    onCompleted: (data) => {
      if (data?.livros) {
        livrosVar(data?.livros);
      }
    }
  });
}

export const useLivro = (slug: string) => {
  return useQuery<{ livro: ILivro }>(GET_BOOK, {
    variables: { slug }
  });
}

export const useLivrosEmDestaque = () => {
  return useQuery<{ destaques: LivrosEmDestaque }>(GET_HIGHLIGHTED_BOOKS, {
    onCompleted: (data) => {
      if (data?.destaques) {
        livrosEmDestaqueVar(data?.destaques);
      }
    }
  });
}