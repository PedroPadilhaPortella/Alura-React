import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import Button from '../Button';

export default function Card({ item }) {
  return (
    <Link to={`/posts/${item.id}`}>
      <div className={styles.post}>
        <img className={styles.capa} src={`/assets/posts/${item.id}/capa.png`} alt="Capa do Card" />
        <h2 className={styles.titulo}>{item.titulo}</h2>
        <Button>Ver mais</Button>
      </div>
    </Link>
  );
}