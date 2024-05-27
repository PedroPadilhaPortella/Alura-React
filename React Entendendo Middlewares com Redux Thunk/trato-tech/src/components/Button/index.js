import styles from './Button.module.scss';

export default function Button({ children, type = 'button', onClick }) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}