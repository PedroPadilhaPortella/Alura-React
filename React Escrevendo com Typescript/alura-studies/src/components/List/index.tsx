import Item from './Item';
import styles from './List.module.scss';
import ITask from '../../types/task';

interface ListProps {
  tasks: ITask[];
  selectTask: (tarefa: ITask) => void
}

export default function List({ tasks, selectTask }: ListProps) {
  return (
    <aside className={styles.listaTarefas}>
      <h2>Estudos do Dia</h2>
      <ul>
        { tasks.map((task, index) => <Item key={index} item={task} selectTask={selectTask} />) }
      </ul>
    </aside>
  );
}