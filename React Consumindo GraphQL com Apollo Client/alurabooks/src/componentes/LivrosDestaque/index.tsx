import { AbBotao, AbCard } from "ds-alurabooks"
import { useEffect, useState } from "react"
import { ILivro } from "../../interfaces/ILivro"

import './LivrosDestaque.css'
import { currencyFormatter } from "../../utils/currencyFormatter"
import { useNavigate } from "react-router-dom"

interface LivrosDestaqueProps {
  livros: ILivro[]
}

const LivrosDestaque = ({ livros }: LivrosDestaqueProps) => {

  const navigate = useNavigate();
  const [selecionado, selecionarLivro] = useState<ILivro>()

  useEffect(() => {
    if (livros?.length) {
      selecionarLivro(livros[0])
    }
  }, [livros])

  const valorMinimo = selecionado ? Math.min(...selecionado.opcoesCompra.map(op => op.preco)) : 0

  const navigateToBook = (livro: ILivro) => {
    navigate(`/livro/${livro.slug}`);
  }

  return (
    <section className="LivrosDestaque">
      <div>
        <ul className="livros">
          {
            livros.map(livro => {
              return (
                <li
                  key={livro.titulo}
                  onClick={() => selecionarLivro(livro)}
                  className={selecionado?.titulo === livro.titulo ? 'selecionado' : ''}
                >
                  <img
                    src={livro.imagemCapa}
                    alt={`Capa do livro ${livro.titulo} escrito por ${livro.autor.nome}`}
                  />
                </li>)
            })
          }
        </ul>
      </div>
      <AbCard>
        {
          selecionado &&
          <div className="selecionado-detalhes">
            <header>
              <h5>Sobre o livro:</h5>
            </header>
            <h6>{selecionado.titulo}</h6>
            <p>{selecionado.descricao}</p>
            <p>Por: {selecionado.autor.nome}</p>
            <footer>
              <div className="preco">
                <em>A partir de:</em>
                <strong>{currencyFormatter.format(valorMinimo)}</strong>
              </div>
              <div>
                <AbBotao texto="Comprar" onClick={() => navigateToBook(selecionado)} />
              </div>
            </footer>
          </div>
        }

      </AbCard>
    </section>
  );
}

export default LivrosDestaque