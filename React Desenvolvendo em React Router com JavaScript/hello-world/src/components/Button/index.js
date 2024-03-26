import styles from './Button.module.css';

export default function Button(props) {
  return (
    <button className={`${styles.botao} ${ props.size === 'lg' ? styles.lg : ''}`}>
      {props.children}
    </button>
  );
}