import styles from './Item.module.scss';
import ITask from '../../../types/task';

interface ItemProps {
  item: ITask;
  selectTask: (tarefa: ITask) => void
}

export default function Item({ item, selectTask }: ItemProps) {
  return (
    <li
      className={`${styles.item} 
        ${item.selected ? styles.itemSelecionado : ''}
        ${item.completed ? styles.itemCompletado : ''}`}
      onClick={() => !item.completed && selectTask(item)}
    >
      <h3> {item.name}</h3>
      <span> {item.time}</span>
      {item.completed && <span className={styles.concluido} aria-label="tarefa completada"></span>}
    </li>
  );
}