import styles from './Cardapio.module.scss';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Searcher from './Searcher';
import Filters from './Filters';
import { useState } from 'react';
import OrderBy from './OrderBy';
import Items from './Items';
import { OrderByType } from 'types/OrderType';

export default function Cardapio() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<number | null>(null)
  const [orderBy, setOrderBy] = useState<OrderByType>('')

  return (
    <main>
      <nav className={styles.menu}>
        <Logo />
      </nav>
      <header className={styles.header}>
        <div className={styles.header__text}>
          A casa do código e da massa
        </div>
      </ header>
      <section className={styles.cardapio}>
        <h3 className={styles.cardapio__title}>Cardápio</h3>
        <Searcher search={search} setSearch={setSearch} />
        <div className={styles.cardapio__filters}>
          <Filters filter={filter} setFilter={setFilter} />
          <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
        </div>
        <Items search={search} filter={filter} orderBy={orderBy} />
      </section>
    </main>
  );
}