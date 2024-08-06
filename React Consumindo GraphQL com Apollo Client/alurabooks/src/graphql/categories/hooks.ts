import { useQuery } from "@apollo/client";
import { ICategoria } from "../../interfaces/ICategoria";
import { GET_CATEGORIES } from "./queries";
import { categoriasVar } from "./state";

export const useCategorias = () => {
  return useQuery<{ categorias: ICategoria[] }>(GET_CATEGORIES, {
    onCompleted(data) {
      if (data?.categorias) {
        categoriasVar(data.categorias);
      }
    },
  })
}