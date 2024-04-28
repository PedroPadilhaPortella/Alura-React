import { useRecoilValue } from "recoil";
import { filteredEventsState } from "../selectors";

const useListEvents = () => {
  return useRecoilValue(filteredEventsState);
}

export default useListEvents;