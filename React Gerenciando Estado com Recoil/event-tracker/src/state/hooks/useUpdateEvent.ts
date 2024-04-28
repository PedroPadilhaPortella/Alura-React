import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { eventListState } from "../atom"

const useUpdateEvent = () => {
  const setEventListState = useSetRecoilState<IEvento[]>(eventListState);

  return (event: IEvento) => {
    setEventListState((events) => {
      return events.map((e) => (e.id === event.id) ? event : e);
    })
  }
}

export default useUpdateEvent;