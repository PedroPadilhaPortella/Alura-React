import { AbCampoTexto } from "ds-alurabooks";
import { useEffect, useState } from "react";
import { booksFilterVar, useLivros } from "../../graphql";
import { ICategoria } from "../../interfaces/ICategoria";
import CardLivro from "../CardLivro";
import './ListaLivros.css';
import { useReactiveVar } from "@apollo/client";
import { livrosVar } from "../../graphql";

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  booksFilterVar({ ...booksFilterVar(), categoria });

  const livros = useReactiveVar(livrosVar);
  useLivros();

  const [search, setSearch] = useState('');

  useEffect(() => {
    booksFilterVar({
      ...booksFilterVar(),
      titulo: (search.length >= 3) ? search : '',
    });
  }, [search]);

  return (
    <section>
      <form className="formularioBusca">
        <AbCampoTexto value={search} onChange={setSearch} placeholder='Digite o título' placeholderAlign="center" />
      </form>
      <div className="livros">
        {livros.map(livro => <CardLivro livro={livro} key={livro.id} />)}
      </div>
    </section>
  );
}

export default ListaLivros;