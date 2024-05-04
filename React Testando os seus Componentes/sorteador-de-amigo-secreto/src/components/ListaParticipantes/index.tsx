import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";
import styles from './ListaParticipantes.module.css';

export default function ListaParticipantes() {
  const participantes: string[] = useListaParticipantes();

  return (
    <ul>
      {participantes.map(participante => <li className={styles.lista} key={participante}>{participante}</li>)}
    </ul>
  );
}