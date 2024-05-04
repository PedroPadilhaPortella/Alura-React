import { useNavigate } from "react-router-dom";
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";
import styles from './Rodape.module.css';
import { useSorteador } from "../../state/hooks/useSorteador";

export default function Rodape() {
  const participantes = useListaParticipantes();
  const navigate = useNavigate();
  const sortear = useSorteador();

  const iniciar = () => {
    sortear()
    navigate('/sorteio')
  }

  return (
    <footer className={styles.rodapeConfiguracoes}>
      <button className={styles.botao} disabled={participantes.length < 3} onClick={iniciar}>
        Iniciar brincadeira
      </button>
      <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
    </footer>
  );
}