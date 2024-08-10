import { IItemCarrinho } from '../../../interfaces/IItemCarrinho'
import './CarrinhoSuspensoItem.css'

const CarrinhoSuspensoItem = ({ item }: { item: IItemCarrinho }) => {
  return (
    <div className="carrinho-suspenso-item">
      <img className='item-image' src={item.livro.imagemCapa} alt={item.livro.descricao} />
      <div className='item-conteudo'>
        <h5>{item.livro.titulo}</h5>
        <h6>Autoria: {item.livro.autor.nome}</h6>
        <h6>Quantidade: {item.quantidade}</h6>
      </div>
    </div>
  );
}

export default CarrinhoSuspensoItem;