import { useState } from 'react';
import Buscador from './Buscador';
import styles from './Cardapio.module.scss';
import Filtros from './Filtros';
import Itens from './Itens';
import Ordenador from './Ordenador';
import themaStyles from 'styles/Tema.module.scss';

export default function Cardapio() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<number | null>(null);
  const [ordenador, setOrdenador] = useState('');

  return (
    <main>
      <section className={themaStyles.container}>
        <h3 className={themaStyles.titulo}>Cardápio</h3>
        <Buscador busca={busca} setBusca={setBusca} />
        <div className={styles.cardapio__filtros}>
          <Filtros filtro={filtro} setFiltro={setFiltro} />
          <Ordenador ordenador={ordenador} setOrdenador={setOrdenador} />
        </div>
        <Itens busca={busca} filtro={filtro} ordenador={ordenador} />
      </section>
    </main>
  );
}