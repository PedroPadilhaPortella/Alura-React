import { AbBotao, AbTag, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from "ds-alurabooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BlocoSobre from "../../componentes/BlocoSobre";
import Loader from "../../componentes/Loader";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import { useLivro } from "../../graphql";
import { currencyFormatter } from "../../utils/currencyFormatter";
import "./Livro.css";

const Livro = () => {
  const params = useParams();

  const [opcao, setOpcao] = useState<AbGrupoOpcao>();
  const [quantidade, setQuantidade] = useState<number>(0);

  const { data, error, loading } = useLivro(params.slug || '');

  if (error) {
    return <h1 style={{ textAlign: 'center', padding: '120px 0' }}>Ops! Algum erro inesperado aconteceu ou o Livro não foi encontrado!</h1>
  }

  if (loading || !data?.livro) {
    return <Loader />
  }

  const opcoes: AbGrupoOpcao[] = data?.livro.opcoesCompra ? data.livro.opcoesCompra.map(opcao => ({
    id: opcao.id,
    corpo: currencyFormatter.format(opcao.preco),
    titulo: opcao.titulo,
    rodape: opcao.formatos ? opcao.formatos.join(',') : ''
  }))
    : []

  return (
    <section className="livro-detalhe">
      <TituloPrincipal texto="Detalhes do Livro" />
      <div className="">
        <div className="container">
          <figure>
            <img src={data?.livro.imagemCapa} alt={data?.livro.descricao} />
          </figure>
          <div className="detalhes">
            <h2>{data?.livro.titulo}</h2>
            <p>{data?.livro.descricao}</p>
            <h3>Selecione o formato do seu livro:</h3>
            <div className="opcoes">
              <AbGrupoOpcoes
                opcoes={opcoes}
                onChange={setOpcao}
                valorPadrao={opcao}
              />
            </div>
            <p><strong>*Você terá acesso às futuras atualizações do livro.</strong></p>
            <footer>
              <div className="qtdContainer">
                <AbInputQuantidade onChange={(value) => setQuantidade(value)} value={quantidade} />
              </div>
              <div>
                <AbBotao texto="Comprar" />
              </div>
            </footer>
          </div>
        </div>
        <div>
          <BlocoSobre titulo="Sobre o Autor" corpo={data?.livro.autor.nome} />
          <BlocoSobre titulo="Sobre o Livro" corpo={data?.livro.sobre} />
        </div>
        <div className="tags">
          {
            data?.livro.tags.map(tag => (
              <AbTag key={tag.id} texto={tag.nome} contexto="secundario" />
            ))
          }
        </div>
      </div>
    </section>
  );
}

export default Livro;