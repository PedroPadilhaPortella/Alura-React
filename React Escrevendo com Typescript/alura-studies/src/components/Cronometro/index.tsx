import styles from './Cronometro.module.scss';
import Button from '../Button';
import Relogio from './Relogio';
import { timeToSeconds } from '../../common/utils/time';
import { useEffect, useState } from 'react';
import ITask from '../../types/task';

interface CronometroProps {
  selectedTask: ITask | undefined;
  finishTask: () => void;
}

export default function Cronometro({ selectedTask, finishTask }: CronometroProps) {
  const [time, setTime] = useState<number>();

  useEffect(() => {
    if (selectedTask?.time) {
      setTime(timeToSeconds(selectedTask.time));
    }
  }, [selectedTask]);

  function contarRegressivamente(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTime(contador - 1);
        return contarRegressivamente(contador - 1);
      }
      finishTask();
    }, 1000)
  }

  return (
    <div className={styles.cronometro}>
      <p className={styles.titulo}>Escolha um card e inicie o Cronômetro</p>
      <div className={styles.relogioWrapper}>
        <Relogio time={time} />
      </div>
      <Button type='button' onClick={() => contarRegressivamente(time)}>
        Começar!
      </Button>
    </div>
  );
}