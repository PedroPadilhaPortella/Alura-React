
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend';
import 'kalend/dist/styles/index.css';
import React from 'react';
import useListEvents from '../../state/hooks/useListEvents';
import useUpdateEvent from '../../state/hooks/useUpdateEvent';
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json';

interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

const Calendario: React.FC = () => {

  const updateEvent = useUpdateEvent();
  const eventos = useListEvents();

  const eventosKalend = new Map<string, IKalendEvento[]>();

  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, [])
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    })
  });

  const onEventDragFinish: OnEventDragFinish = (
    kalendEventoInalterado: CalendarEvent,
    kalendEventoAtualizado: CalendarEvent
  ) => {
    const event = eventos.find(evento => evento.descricao === kalendEventoAtualizado.summary);

    if (event) {
      const updatedEvent = { ...event }
      updatedEvent.inicio = new Date(kalendEventoAtualizado.startAt)
      updatedEvent.fim = new Date(kalendEventoAtualizado.endAt)
      
      updateEvent(updatedEvent);
    }
  };

  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
      />
    </div>
  );
}

export default Calendario