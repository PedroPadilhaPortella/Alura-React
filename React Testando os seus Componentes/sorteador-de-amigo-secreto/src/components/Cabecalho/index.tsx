import styles from './Cabecalho.module.css';

export default function Cabecalho() {

  return (
    <header className={styles.cabecalho}>
      <div 
        className={styles.logo}
        role="img"
        aria-label='Logo do Sorteador'
      ></div>
      <img 
        className={styles.participante}
        src="/imagens/participante.png" 
        alt="Participante com um presente na mão" 
      />

    </header>
  );
}