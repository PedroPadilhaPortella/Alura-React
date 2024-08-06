import { IAuthor } from "./IAuthor"
import { IOpcaoCompra } from "./IOpcaoCompra"
import { ITag } from "./ITag"

export interface ILivro {
  id: number
  categoria: number
  titulo: string
  slug: string
  descricao: string
  isbn: string
  numeroPaginas: number
  publicacao: string
  imagemCapa: string
  autor: IAuthor
  opcoesCompra: IOpcaoCompra[]
  sobre: string
  tags: ITag[]
}

export interface LivrosEmDestaque {
  lancamentos: ILivro[]
  maisVendidos: ILivro[]
}