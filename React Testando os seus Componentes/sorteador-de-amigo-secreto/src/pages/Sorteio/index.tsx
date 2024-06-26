import { useState } from "react";
import Card from "../../components/Card";
import { useListaParticipantes } from "../../state/hooks/useListaParticipantes";
import { useResultadoSorteio } from "../../state/hooks/useResultadoSorteio";
import styles from './Sorteio.module.css';

export default function Sorteio() {

  const participantes = useListaParticipantes();

  const [participanteDaVez, setParticipanteDaVez] = useState('');
  const [amigoScreto, setAmigoSecreto] = useState('');

  const resultado = useResultadoSorteio();

  const sortear = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
<<<<<<< HEAD

    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!);
      setTimeout(() => {
        setAmigoSecreto('');
      }, 5000);
=======
    
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!)
>>>>>>> dfd0c50b37ad4086b2ca5659fff9fc9aab86b03f
    }
  }

  return (
    <Card>
      <section className={styles.sorteio}>
        <h2>Quem vai tirar o papelzinho?</h2>

        <form onSubmit={sortear}>
          <select
            required
            name="participanteDavez"
            id="participanteDavez"
<<<<<<< HEAD
            placeholder="Selecione o participante"
=======
            placeholder="Selecione o seu nome"
>>>>>>> dfd0c50b37ad4086b2ca5659fff9fc9aab86b03f
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value)}
          >
            <option value="">Selecione seu Nome</option>
            {participantes.map(participante => <option key={participante}>{participante}</option>)}
          </select>

          <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
          <button className={styles.botaoSortear}>Sortear</button>
        </form>

        {amigoScreto && <p className={styles.resultado} role="alert">{amigoScreto}</p>}

        <footer className={styles.sorteio}>
          <img src="/imagens/aviao.png" className={styles.aviao} alt="Um desenho de um avião de papel" />
        </footer>

      </section>
    </Card>
  );
}