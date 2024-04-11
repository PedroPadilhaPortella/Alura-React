import { useFavoritoContext } from 'contextos/FavoritosContext';
import styles from './Card.module.css';
import iconeDesfavoritar from './desfavoritar.png';
import iconeFavoritar from './favoritar.png';
import { Link } from 'react-router-dom';

export default function Card({ id, titulo, capa }) {
  const { favoritos, adicionarFavorito } = useFavoritoContext();
  const ehFavorito = favoritos.some((f) => f.id === id);
  const icone = ehFavorito ? iconeDesfavoritar : iconeFavoritar

  return (
    <div className={styles.container}>
      <Link to={`/${id}`} className={styles.link}>
        <img src={capa} alt={titulo} className={styles.capa} />
        <h2>{titulo}</h2>
      </Link>
      <img
        className={styles.favoritar}
        src={icone}
        alt="Favoritar filme"
        onClick={() => adicionarFavorito({ id, titulo, capa })}
      />
    </div>
  );
}