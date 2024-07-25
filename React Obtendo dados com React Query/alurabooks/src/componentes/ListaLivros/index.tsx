import { useQuery } from "@tanstack/react-query"
import { ICategoria } from "../../interfaces/ICategoria"
import { getBooksByCategory } from "../../http";
import CardLivro from "../CardLivro";
import './ListaLivros.css'

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  const { data: produtos } = useQuery({
    queryKey: ['booksByCategory', categoria],
    queryFn: () => getBooksByCategory(categoria)
  });

  return (
    <section className="livros">
      {produtos?.map(livro => <CardLivro livro={livro} key={livro.id} />)}
    </section>
  );
}

export default ListaLivros;