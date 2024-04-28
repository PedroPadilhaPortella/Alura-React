import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { eventListState } from "../atom"
import { generateId } from "../../util";

const useAddEvent = () => {
  const setEventListState = useSetRecoilState<IEvento[]>(eventListState);

  return (event: IEvento) => {
    const today = new Date();

    if (event.inicio < today) {
      throw new Error("Eventos não podem ser cadastrados com data menor do que a atual.")
    }

    event.id = generateId();

    return setEventListState(events => [...events, event])
  }
}

export default useAddEvent;