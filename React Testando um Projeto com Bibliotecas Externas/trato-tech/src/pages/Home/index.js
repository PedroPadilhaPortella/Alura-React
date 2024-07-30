import relogio from 'assets/inicial.png';
import Button from 'components/Button';
import Header from 'components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadCategories } from '../../store/reducers/categorias';
import styles from './Home.module.scss';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categorias = useSelector(state => state.categorias);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div>
      <Header
        titulo='Classificados Tech'
        descricao='Compre diversos tipos de produtos no melhor site do Brasil!'
        imagem={relogio}
        className={styles.header}
      >
        <Button data-testid='home-botao-anunciar' onClick={() => navigate('/anuncie')}>Quero anunciar</Button>
      </Header>
      <div className={styles.categorias}>
        <div className={styles['categorias-title']}>
          <h1>
            Categorias
          </h1>
        </div>
        <div className={styles['categorias-container']}>
          {categorias.map((categoria, index) => (
            <div key={index} data-testid='home-categorias' onClick={() => navigate(`/categoria/${categoria.id}`)}>
              <img src={categoria.thumbnail} alt={categoria.nome} />
              <h1>{categoria.nome}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}