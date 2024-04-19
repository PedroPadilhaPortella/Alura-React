import { useEffect, useState } from 'react';
import Item from './Item';
import styles from './Items.module.scss';
import cardapio from './items.json';
import { OrderByType } from 'types/OrderType';

interface ItemsProps {
  search: string;
  filter: number | null;
  orderBy: OrderByType;
}

export default function Items({ search, filter, orderBy }: ItemsProps) {
  const [list, setList] = useState(cardapio);

  function checkSearch(title: string) {
    const regex = new RegExp(search, 'i');
    return regex.test(title);
  }

  function checkFilter(id: number) {
    if (filter !== null) return filter === id;
    return true;
  }

  function order (list: typeof cardapio, orderBy: '' | 'size' | 'serving' | 'price') {
    return (orderBy === '') ? list : list.sort((a, b) => (a[orderBy] > b[orderBy] ? 1 : -1));
  }

  useEffect(() => {
    const newList = cardapio.filter(item => checkSearch(item.title) && checkFilter(item.category.id));
    setList(order(newList, orderBy));
  },[search, filter, orderBy])

  return (
    <div className={styles.itens}>
      {
        list.map(item => (
          <Item key={item.id} {...item} />
        ))
      }
    </div>
  );
}