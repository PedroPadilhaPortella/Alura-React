import React from 'react';
import useListEvents from '../../state/hooks/useListEvents';
import Evento from '../Evento';
import Filtro from '../Filtro';
import style from './ListaDeEventos.module.scss';

const ListaDeEventos: React.FC = () => {

  const events = useListEvents();

  return (
    <section>
      <Filtro />
      <div className={style.Scroll}>
        {
          events.map(event => (
            <Evento evento={event} key={event.id} />
          ))
        }
      </div>
    </section>
  )
}

export default ListaDeEventos