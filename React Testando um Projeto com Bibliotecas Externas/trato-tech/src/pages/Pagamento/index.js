import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Select from '../../components/Select';
import styles from './Pagamento.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadPayment, finishPayment } from 'store/reducers/carrinho';

export default function Pagamento() {
  const dispatch = useDispatch();

  const usuario = useSelector(state => state.usuario);
  const total = useSelector(state => state.carrinho.total);
  const carrinho = useSelector(state => state.carrinho);

  console.log(carrinho)
  console.log(total)

  const [paymentMethod, setPaymentMethod] = useState('-');

  const valorTotal = paymentMethod === '-' ? total : total * paymentMethod.taxa;

  function finalizar() {
    dispatch(finishPayment({ valorTotal, paymentMethod }));
  }

  function updatePaymentMethod(event) {
    if (event.target.value === '-') return setPaymentMethod('-');
    setPaymentMethod(usuario.cartoes.find((cartao) => cartao.id === event.target.value));
  }

  useEffect(() => {
    dispatch(loadPayment());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header titulo='Pagamento' />
      <div className={styles.dados}>
        <p className={styles.forma}>Olá {usuario.nome}! Escolha a forma de pagamento:</p>
        <Select value={paymentMethod.id} onChange={updatePaymentMethod} placeholder='Forma de pagamento' alt='Forma de pagamento'>
          <option value='-'>Forma de pagamento</option>
          {
            usuario.cartoes?.map((cartao) => (
              <option key={cartao.id} value={cartao.id}>{cartao.nome}</option>
            ))
          }
        </Select>
        <div className={styles.content}>
          {paymentMethod !== '-' && (
            <>
              <p> A forma de pagamento {paymentMethod.nome} tem taxa de {paymentMethod.taxa}x </p>
              <p> O saldo deste cartão é de R$ {paymentMethod.saldo.toFixed(2)} </p>
            </>
          )}
          <p>Total com taxas: R$ {valorTotal.toFixed(2)} </p>
        </div>
        <div className={styles.finalizar}>
          <Button disabled={valorTotal === 0 || paymentMethod === '-'} onClick={finalizar}
          >Finalizar Compra</Button>
        </div>
      </div>
    </div>
  );
}