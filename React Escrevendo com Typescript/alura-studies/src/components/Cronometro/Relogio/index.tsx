import styles from './Relogio.module.scss';

interface RelogioProps {
  time: number | undefined
}

export default function Relogio({ time = 0 }: RelogioProps) {
  const minutos = Math.floor(time / 60);
  const segundos = time % 60;
  const [minutoDezena, minutoUnidade] = String(minutos).padStart(2, '0');
  const [segundoDezena, segundoUnidade] = String(segundos).padStart(2, '0');

  return (
    <>
      <span className={styles.relogioNumero}>{minutoDezena}</span>
      <span className={styles.relogioNumero}>{minutoUnidade}</span>
      <span className={styles.relogioDivisao}>:</span>
      <span className={styles.relogioNumero}>{segundoDezena}</span>
      <span className={styles.relogioNumero}>{segundoUnidade}</span>
    </>
  );
}