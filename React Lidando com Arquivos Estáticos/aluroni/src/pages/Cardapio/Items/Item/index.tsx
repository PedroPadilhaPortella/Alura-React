import cardapio from '../items.json';
import styles from './Item.module.scss';
import classNames from "classnames";

type ItemProps = typeof cardapio[0];

export default function Item(props: ItemProps) {

  return (
    <div className={styles.item}>
      <div className={styles.item__imagem}>
        <img src={props.photo} alt={props.title} />
      </div>
      <div className={styles.item__descricao}>
        <div className={styles.item__titulo}>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className={styles.item__tags}>
          <div className={classNames({
            [styles.item__tipo]: true,
            [styles[`item__tipo__${props.category.label.toLowerCase()}`]]: true
          })}>
            {props.category.label}
          </div>
          <div className={styles.item__porcao}>{props.size}g</div>
          <div className={styles.item__qtdpessoas}>{props.serving} pessoa{props.serving === 1 ? "" : "s"}</div>
          <div className={styles.item__valor}>R$ {props.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}