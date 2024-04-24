import TagsPrato from 'components/TagsPrato';
import { useNavigate } from 'react-router-dom';
import { Prato } from 'types/Prato';
import styles from './Item.module.scss';

export default function Item(props: Prato) {
  const navigate = useNavigate();

  return (
    <div className={styles.item} onClick={() => navigate(`/prato/${props.id}`)}>
      <div className={styles.item__imagem}>
        <img src={props.photo} alt={props.title} />
      </div>
      <div className={styles.item__descricao}>
        <div className={styles.item__titulo}>
          <h2> {props.title} </h2>
          <p> {props.description} </p>
        </div>
        <TagsPrato {...props} />
      </div>
    </div>
  );
}