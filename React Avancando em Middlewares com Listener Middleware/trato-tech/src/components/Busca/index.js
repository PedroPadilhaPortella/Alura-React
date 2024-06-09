import styles from './Busca.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { mudarBusca, resetarBusca } from '../../store/reducers/busca';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Busca() {

  const busca = useSelector(state => state.busca);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetarBusca());
  }, [dispatch, location.pathname])

  const buscar = (event) => {
    dispatch(mudarBusca(event.target.value));
  }

  return (
    <div className={styles.busca}>
      <input
        value={busca}
        className={styles.input}
        placeholder="O que você procura?"
        onChange={buscar}
      />
    </div>
  )
}