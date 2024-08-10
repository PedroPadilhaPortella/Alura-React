import { gql } from "@apollo/client";

export const GET_CART = gql`
  query ObterCarrinho {
    carrinho {
      total
      itens {
        quantidade
        opcaoCompra { id preco }
        livro {
          id
          titulo
          descricao
          imagemCapa
          autor { nome }
        }
      }
    }
  }
`;

export const ADD_CART_ITEM = gql`
  mutation AdicionarItem($item: ItemCarrinhoInput!) {
    adicionarItem(item: $item)
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoverItem($item: ItemCarrinhoInput!) {
    removerItem(item: $item)
  }
`;