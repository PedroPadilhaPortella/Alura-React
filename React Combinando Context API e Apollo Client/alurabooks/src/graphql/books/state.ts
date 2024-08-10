import { makeVar } from "@apollo/client";
import { ILivro, LivrosEmDestaque } from "../../interfaces/ILivro";
import { ICategoria } from "../../interfaces/ICategoria";

interface IBooksFilter {
  categoria?: ICategoria;
  titulo?: string;
}

export const booksFilterVar = makeVar<IBooksFilter>({});

export const livrosVar = makeVar<ILivro[]>([]);

export const livrosEmDestaqueVar = makeVar<LivrosEmDestaque>({ lancamentos: [], maisVendidos: [] });