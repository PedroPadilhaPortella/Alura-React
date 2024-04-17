import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ITask from '../../types/task';
import Button from '../Button';
import styles from './Form.module.scss';

interface FormProps {
  setTarefas: Dispatch<SetStateAction<ITask[]>>;
}

export default function Form({ setTarefas }: FormProps) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('00:00');

  function adicionarTarefa(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setTarefas(tarefasAntigas =>
      [
        ...tarefasAntigas,
        { name, time, selected: false, completed: false, id: uuidv4() } as ITask
      ]
    )
    setName('');
    setTime('00:00');
  }

  return (
    <form className={styles.novaTarefa} onSubmit={adicionarTarefa}>
      <div className={styles.inputContainer}>
        <label htmlFor="tarefa">Adicione um novo estudo</label>
        <input
          type="text" placeholder="O que você quer estudar?" required
          name="tarefa" id="tarefa" value={name}
          onChange={(e) => setName(e.target.value)}

        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="tempo">Tempo</label>
        <input
          type="time" step="1" min="00:00:00" max="01:30:00" required
          name="tempo" id="tempo" value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <Button type="submit">Adicionar</Button>
    </form>
  );
}