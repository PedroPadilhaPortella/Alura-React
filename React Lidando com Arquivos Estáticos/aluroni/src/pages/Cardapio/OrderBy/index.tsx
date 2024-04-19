import { useState } from "react";
import classNames from 'classnames';
import options from "./options.json";
import styles from './OrderBy.module.scss';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { OrderByType } from "types/OrderType";

interface OrderByProps {
  orderBy: string,
  setOrderBy: React.Dispatch<React.SetStateAction<OrderByType>>
}

export default function OrderBy({ orderBy, setOrderBy }: OrderByProps) {
  const [open, setOpen] = useState(false);

  const OrderByOption = orderBy && options.find(option => option.value === orderBy)?.name;

  return (
    <button
      className={classNames({ [styles.orderby]: true, [styles["orderby--ativo"]]: orderBy !== "" })}
      onClick={() => setOpen(!open)}
      onBlur={() => setOpen(false)}
    >
      <span>{OrderByOption || "Ordenar Por"}</span>
      {open ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
      <div className={classNames({
        [styles.orderby__options]: true,
        [styles['orderby__options--ativo']]: open
      })}>
        {
          options.map(option => (
            <div
              className={styles.orderby__option}
              key={option.value}
              onClick={() => setOrderBy(option.value as OrderByType)}
            >
              {option.name}
            </div>
          ))
        }
      </div>
    </button>
  )
}