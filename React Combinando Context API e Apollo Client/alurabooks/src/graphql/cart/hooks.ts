import { useMutation, useQuery } from "@apollo/client";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { ADD_CART_ITEM, GET_CART, REMOVE_CART_ITEM } from "./queries";

export const useCarrinho = () => {
  return useQuery<{ carrinho: ICarrinho }>(GET_CART)
}

export const useAdicionarItem = () => {
  return useMutation(ADD_CART_ITEM, {
    refetchQueries: ['ObterCarrinho']
  });
}

export const useRemoverItem = () => {
  return useMutation(REMOVE_CART_ITEM, {
    refetchQueries: ['ObterCarrinho']
  });
}