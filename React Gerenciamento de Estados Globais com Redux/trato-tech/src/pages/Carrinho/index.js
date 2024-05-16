import styles from './Carrinho.module.scss';
import Header from 'components/Header';
import { useSelector, useDispatch } from 'react-redux';
import Item from 'components/Item';
import { resetarCarrinho } from '../../store/reducers/carrinho';

export default function Carrinho() {

  const dispatch = useDispatch();

  const { carrinho, total } = useSelector(state => {
    const regExp = new RegExp(state.busca, 'i');
    let total = 0;

    const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find(i => i.id === itemNoCarrinho.id);

      if (item.titulo.match(regExp)) {
        itens.push({ ...item, quantidade: itemNoCarrinho.quantidade });
      }

      total += (item.preco * itemNoCarrinho.quantidade);
      return itens;
    }, []);

    return { carrinho: carrinhoReduce, total };
  });

  const finalizarCompra = () => {
    dispatch(resetarCarrinho());
  }

  return (
    <div>
      <Header
        titulo='Carrinho de compras'
        descricao='Confira produtos que você adicionou ao carrinho.'
      />
      <div className={styles.carrinho}>
        {
          carrinho.map(item => <Item key={item.id} {...item} carrinho />)
        }
        <div className={styles.total}>
          <strong>
            Resumo da compra
          </strong>
          <span>
            Subtotal: <strong> R$ {total.toFixed(2)} </strong>
          </span>
        </div>
        <button className={styles.finalizar} onClick={finalizarCompra}>Finalizar Compra</button>
      </div>
    </div>
  );
}