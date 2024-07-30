import styles from './Button.module.scss';

export default function Button({
  children,
  type = 'button',
  onClick,
  disabled,
  ...props
}) {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  )
}