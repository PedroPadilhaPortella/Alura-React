import erro404 from 'assets/erro_404.png';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.conteudoContainer}>
        <span className={styles.texto404}>404</span>
        <h1 className={styles.titulo}>Ops! Página não encontrada.</h1>
        <p className={styles.paragrafo}>
          Tem certeza de que era isso que você estava procurando?
        </p>
        <p className={styles.paragrafo}>
          Aguarde alguns instantes e recarregue a página, ou volte para a página inicial.
        </p>
        <div className={styles.botaoContainer} onClick={() => navigate(-1)}>
          <Button size="lg">Voltar</Button>
        </div>
        <img className={styles.imagemCachorro} src={erro404} alt="" aria-hidden={true} />
      </div>
      <div className={styles.espacoEmBranco}></div>
    </>
  );
}