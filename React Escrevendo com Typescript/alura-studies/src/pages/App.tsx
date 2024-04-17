import { useState } from 'react';
import Cronometro from '../components/Cronometro';
import Form from '../components/Form';
import List from '../components/List';
import styles from './App.module.scss';
import ITask from '../types/task';

function App() {
  const [tarefas, setTarefas] = useState<ITask[]>([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<ITask>();

  function selecionarTarefa(selectedTask: ITask) {
    setTarefaSelecionada(selectedTask);
    setTarefas(tarefas => tarefas.map(
      (tarefa) => ({ ...tarefa, selected: (tarefa.id === selectedTask.id) } as ITask)
    ));
  }

  function finalizarTarefa() {
    if (tarefaSelecionada) {
      setTarefaSelecionada(undefined);
      setTarefas(tarefas => tarefas.map(tarefa => {
        if (tarefa.id === tarefaSelecionada.id) {
          return { ...tarefa, selected: false, completed: true }
        }
        return tarefa;
      }));
    }
  }

  return (
    <div className={styles.AppStyle}>
      <Form setTarefas={setTarefas} />
      <List tasks={tarefas} selectTask={selecionarTarefa} />
      <Cronometro selectedTask={tarefaSelecionada} finishTask={finalizarTarefa} />
    </div>
  );
}

export default App;
