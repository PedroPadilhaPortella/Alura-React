import { selector } from "recoil";
import { eventListState, eventsFilter } from "../atom";

export const filteredEventsState = selector({
  key: 'filteredEventsState',
  get: ({ get }) => {
    const eventFilter = get(eventsFilter);
    const allEvents = get(eventListState);

    const events = allEvents.filter((event) => {
      if (!eventFilter.data) {
        return true;
      } else {
        return eventFilter.data.toISOString().slice(0, 10) === event.inicio.toISOString().slice(0, 10);
      }
    });

    return events;
  }
})