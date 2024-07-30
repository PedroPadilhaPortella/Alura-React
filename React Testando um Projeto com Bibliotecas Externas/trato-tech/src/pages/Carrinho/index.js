import Button from 'components/Button';
import Header from 'components/Header';
import Item from 'components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetarCarrinho } from '../../store/reducers/carrinho';
import styles from './Carrinho.module.scss';

export default function Carrinho() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { carrinho, total } = useSelector(state => {
    const regExp = new RegExp(state.busca, 'i');

    const carrinhoReduce = state.carrinho.data.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find(i => i.id === itemNoCarrinho.id);

      if (item.titulo.match(regExp)) {
        itens.push({ ...item, quantidade: itemNoCarrinho.quantidade });
      }
      return itens;
    }, []);

    return { carrinho: carrinhoReduce, total: state.carrinho.total };
  });

  const finalizarCompra = () => {
    navigate('/pagamento');
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
        <Button onClick={finalizarCompra}>Finalizar Compra</Button>
      </div>
    </div>
  );
}