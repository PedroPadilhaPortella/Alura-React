import { useRef, useState } from 'react';
import { useAdicionarParticipante } from '../../state/hooks/useAdicionarParticipante';
import { useMensagemDeErro } from '../../state/hooks/useMensagemDeErro';
import styles from './Formulario.module.css';

const Formulario = () => {

  const adicionarParticipante = useAdicionarParticipante();
  const mensagemDeErro = useMensagemDeErro();

  const [nome, setNome] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const addParticipant = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    adicionarParticipante(nome);
    setNome('');
    inputRef?.current?.focus();
  }

  return (
    <form onSubmit={addParticipant}>
      <div className={styles.grupoInputBtn}>
        <input ref={inputRef}
          type="text" placeholder="Insira os nomes dos participantes"
          value={nome} onChange={(e) => setNome(e.target.value)}
        />
        <button disabled={!nome}>Adicionar</button>
        {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
      </div>
    </form>
  );
}

export default Formulario