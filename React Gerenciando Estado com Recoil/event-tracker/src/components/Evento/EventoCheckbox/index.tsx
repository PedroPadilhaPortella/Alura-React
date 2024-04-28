import React from 'react';
import { IEvento } from '../../../interfaces/IEvento';
import useUpdateEvent from '../../../state/hooks/useUpdateEvent';

const EventoCheckbox: React.FC<{ evento: IEvento }> = ({ evento }) => {

  const updateEvent = useUpdateEvent();
  
  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ]

  const updateEventStatus = () => {
    const updatedEvent: IEvento = {...evento, completo: !evento.completo }
    updateEvent(updatedEvent);
  }

  return (<i className={estilos.join(' ')} onClick={updateEventStatus}></i>)
}

export default EventoCheckbox