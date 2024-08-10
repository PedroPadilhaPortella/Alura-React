import { AbInputQuantidade } from "ds-alurabooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";
import { currencyFormatter } from "../../utils/currencyFormatter";

import lixeira from '../../assets/lixeira.png'
import './ItemCarrinho.css'
import { useCarrinhoContext } from "../../contextApi/carrinho";

const ItemCarrinho = ({ item }: { item: IItemCarrinho }) => {

  const { adicionarItemCarrinho, removerItemCarrinho } = useCarrinhoContext();

  const updateQuantidade = (value: number) => {
    if (value === 0) {
      deleteItem();
    }

    adicionarItemCarrinho({
      livro: item.livro,
      opcaoCompra: item.opcaoCompra,
      quantidade: value
    });
  }

  const deleteItem = () => {
    removerItemCarrinho({
      livro: item.livro,
      opcaoCompra: item.opcaoCompra,
      quantidade: item.quantidade
    })
  }

  return (
    <div className="item-carrinho">
      <figure>
        <img src={item.livro.imagemCapa} alt={item.livro.descricao} />
      </figure>
      <div className="detalhes">
        <ul>
          <li className="titulo">{item.livro.titulo}</li>
          <li className="descricao">{item.livro.descricao}</li>
          <li className="autor">Por: {item.livro.autor.nome}</li>
        </ul>
      </div>
      <div>
        <ul className="preco">
          <li className="label">
            <strong>Preço</strong>
          </li>
          <li className="valor">
            {currencyFormatter.format(item.opcaoCompra.preco)}
          </li>
        </ul>
      </div>
      <div className="quantidade">
        <AbInputQuantidade
          value={item.quantidade}
          onChange={updateQuantidade}
        />
      </div>
      <div>
        <button className="btn-excluir" onClick={deleteItem}>
          <img src={lixeira} alt="Ícone de uma lixeira" />
        </button>
      </div>
    </div>
  );
}

export default ItemCarrinho;