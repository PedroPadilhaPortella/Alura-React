import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query ObterLivros($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
      id, 
      titulo, 
      descricao,
      slug,
      imagemCapa,
      opcoesCompra { preco }
    }
  }
`;

export const GET_BOOK = gql`
  query ObterLivro($slug: String!) {
    livro(slug: $slug) {
      id, 
      titulo, 
      descricao,
      slug,
      imagemCapa,
      sobre
      autor { nome sobre }
      opcoesCompra {
        id
        titulo
        preco
        formatos 
      }
      tags { nome }
    }
  }
`;

export const GET_HIGHLIGHTED_BOOKS = gql`
  query ObterLivrosEmDestaque {
    destaques {
  	  lancamentos {
        id
        titulo
        descricao
        imagemCapa
        autor { id nome }
        slug
        opcoesCompra { id preco }
      }
 		  maisVendidos {
        id
        titulo
        descricao
        imagemCapa
        autor { nome }
        slug
        opcoesCompra { id preco }
  	  }
    }
  }
`;