import styles from './Searcher.module.scss';
import { CgSearch } from "react-icons/cg";

interface SearcherProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Searcher(props: SearcherProps) {
  return (
    <div className={styles.searcher}>
    <input
      value={props.search}
      onChange={(e) => props.setSearch(e.target.value)}
      placeholder='Buscar'
    />
    <CgSearch size={20} color="#4C4D5E" />
  </div>
  );
}