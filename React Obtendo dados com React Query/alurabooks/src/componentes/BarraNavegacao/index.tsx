import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import ModalLoginUsuario from "../ModalLoginUsuario"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import { useEffect, useState } from "react"
import { ICategoria } from "../../interfaces/ICategoria"
import http from "../../http"

const BarraNavegacao = () => {
  const token = sessionStorage.getItem('token');

  const [modalRegisterOpening, setModalRegisterOpening] = useState<boolean>(false);
  const [modalLoginOpening, setModalLoginOpening] = useState<boolean>(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(token != null);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  useEffect(() => {
    http.get<ICategoria[]>('categorias').then((response) => {
      console.log(response.data)
      setCategorias(response.data);
    })
  }, [])

  const navigate = useNavigate();

  const onLogin = () => {
    setUserLoggedIn(true);
    setModalLoginOpening(false);
  }

  const onLogout = () => {
    setUserLoggedIn(false);
    sessionStorage.removeItem('token');
    navigate('/');
  }

  const loggedInAction = (
    <>
      <li>
        <Link to="/minha-conta/pedidos">Minha Conta</Link>
      </li>
      <li>
        <BotaoNavegacao
          texto="Logout"
          textoAltSrc="Icone representando um usuário"
          imagemSrc={usuario}
          onClick={onLogout} />
      </li>
    </>
  );
  const notLoggedInAction = (
    <>
      <li>
        <BotaoNavegacao texto="Login" textoAltSrc="Icone representando um usuário" imagemSrc={usuario} onClick={() => setModalLoginOpening(true)} />
      </li>
      <li>
        <BotaoNavegacao
          texto="Cadastrar-se"
          textoAltSrc="Icone representando um usuário"
          imagemSrc={usuario}
          onClick={() => setModalRegisterOpening(true)}
        />
      </li>
      <ModalCadastroUsuario open={modalRegisterOpening} onClose={() => setModalRegisterOpening(false)} />
      <ModalLoginUsuario open={modalLoginOpening} onClose={() => setModalLoginOpening(false)} onLogin={onLogin} />
    </>
  );

  return (
    <nav className="ab-navbar">
      <h1 className="logo">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo da AluraBooks" />
        </Link>
      </h1>
      <ul className="navegacao">
        <li>
          <a href="#!">Categorias</a>
          <ul className="submenu">
            {
              categorias.map((categoria) => (
                <li key={categoria.id}>
                  <Link to={`/categoria/${categoria.slug}`}>
                    {categoria.nome}
                  </Link>
                </li>
              ))
            }
          </ul>
        </li>
      </ul>
      <ul className="acoes">
        {isUserLoggedIn ? loggedInAction : notLoggedInAction}
      </ul>
    </nav>
  );
}

export default BarraNavegacao;