import { createContext, ReactElement, useContext } from 'react';
import { ICarrinho } from '../../interfaces/ICarrinho';
import { useAdicionarItem, useCarrinho, useRemoverItem } from '../../graphql/cart/hooks';
import { IItemCarrinho } from '../../interfaces/IItemCarrinho';

export interface ICarrinhoContext {
  carrinho?: ICarrinho;
  adicionarItemCarrinho: (item: IItemCarrinho) => void;
  removerItemCarrinho: (item: IItemCarrinho) => void;
  loading: boolean;
}

export const CarrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null,
  removerItemCarrinho: () => null,
  loading: false,
});

const CarrinhoProvider = ({ children }: { children: ReactElement }) => {
  const { data, loading: loadingCart } = useCarrinho();
  const [adicionarItem, { loading: adicionarItemLoading }] = useAdicionarItem();
  const [removerItem, { loading: removerItemLoading }] = useRemoverItem();

  const adicionarItemCarrinho = (item: IItemCarrinho) => {
    adicionarItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade
        }
      }
    })
  }

  const removerItemCarrinho = (item: IItemCarrinho) => {
    removerItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade
        }
      }
    })
  }

  return (
    <CarrinhoContext.Provider value={{
      carrinho: data?.carrinho,
      adicionarItemCarrinho,
      removerItemCarrinho,
      loading: loadingCart || adicionarItemLoading || removerItemLoading,
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinhoContext = () => useContext<ICarrinhoContext>(CarrinhoContext);

export default CarrinhoProvider;