import styles from './Filters.module.scss';
import filters from "./filters.json";
import classNames from 'classnames';

interface FiltersProps {
  filter: number | null;
  setFilter: React.Dispatch<React.SetStateAction<number | null>>;
}

type IOption = typeof filters[0];

export default function Filters({ filter, setFilter }: FiltersProps) {

  function selecionarFiltro(option: IOption) {
    if (filter === option.id) return setFilter(null);
    return setFilter(option.id);
  }

  return (
    <div className={styles.filters}>
      {
        filters.map(option => (
          <button
            className={classNames({
              [styles.filters__filter]: true,
              [styles['filters__filter--ativo']]: filter === option.id
            })}
            key={option.id}
            onClick={() => selecionarFiltro(option)}>
            {option.label}
          </button>
        ))
      }
    </div>
  )
}