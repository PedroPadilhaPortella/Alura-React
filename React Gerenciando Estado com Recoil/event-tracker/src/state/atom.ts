import { atom, selector } from "recoil";
import { IEvento } from "../interfaces/IEvento";
import { IEventFilter } from "../interfaces/IEventFilter";

export const eventsAsync = selector({
  key: 'eventsAsync',
  get: async () => {
    const response = await fetch('http://localhost:8080/eventos')
    const events: IEvento[] = await response.json()
    return events.map(event => ({
      ...event,
      inicio: new Date(event.inicio),
      fim: new Date(event.fim)
    }))
  }
})

export const eventListState = atom<IEvento[]>({
  key: 'eventListState',
  default: eventsAsync,
}) ;

export const eventsFilter = atom<IEventFilter>({
  key: 'eventsFilter',
  default: {}
});