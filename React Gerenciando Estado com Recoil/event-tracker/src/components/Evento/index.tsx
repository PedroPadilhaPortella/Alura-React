import React from 'react';
import { IEvento } from '../../interfaces/IEvento';
import useDeleteEvent from '../../state/hooks/useDeleteEvent';
import style from './Evento.module.scss';
import EventoCheckbox from './EventoCheckbox';

const Evento: React.FC<{ evento: IEvento }> = ({ evento }) => {

  const deleteEvent = useDeleteEvent();

  const estilos = [style.Evento]

  if (evento.completo) {
    estilos.push(style.completo)
  }

  const removeEvent = () => {
    deleteEvent(evento);
  }

  return (<div className={estilos.join(' ')}>

    <EventoCheckbox evento={evento} />
    <div className="cards-info">
      <h3 className={style.descricao}>{evento.descricao} - {evento.inicio.toLocaleDateString()}</h3>
    </div>
    <i className="far fa-times-circle fa-2x" onClick={removeEvent}></i>
  </div>)
}

export default Evento