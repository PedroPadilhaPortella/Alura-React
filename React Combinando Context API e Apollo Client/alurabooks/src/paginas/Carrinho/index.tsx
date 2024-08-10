import { AbBotao } from "ds-alurabooks";
import { Link } from "react-router-dom";
import ItemCarrinho from "../../componentes/ItemCarrinho";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import { useCarrinhoContext } from "../../contextApi/carrinho";
import { currencyFormatter } from "../../utils/currencyFormatter";
import "./Carrinho.css";
import LoaderCarrinho from "./LoaderCarrinho";

const Carrinho = () => {
  const { carrinho, loading } = useCarrinhoContext();

  return (
    <section className="pagina-carrinho">
      {loading && <LoaderCarrinho />}
      <TituloPrincipal texto={'Minha Sacola'} />
      <div className="conteudo">
        <h4>Itens Selecionados</h4>
        <div className="itens">
          {
            carrinho?.itens.map((item, index) => <ItemCarrinho key={index} item={item} />)
          }
        </div>
        <div>
          <Link to='/'>Continuar comprando</Link>
        </div>
        <footer>
          <ul>
            <li>Total da compra</li>
            <li><strong>{currencyFormatter.format(carrinho?.total || 0)}</strong></li>
            <li>
              <AbBotao texto="Finalizar compra" />
            </li>
          </ul>
        </footer>
      </div>
    </section>

  );
}

export default Carrinho;