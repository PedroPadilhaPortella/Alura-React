import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query ObterCategorias {
  categorias {
    id
    nome
    slug
  }
}
`;