import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { eventListState } from "../atom";

const useDeleteEvent = () => {
  const setEventListState = useSetRecoilState<IEvento[]>(eventListState);

  return (event: IEvento) => {
    setEventListState((events) => events.filter((e) => e.id !== event.id));
  }
}

export default useDeleteEvent;