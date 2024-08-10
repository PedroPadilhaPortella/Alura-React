import { AbBotao, AbCampoTexto, AbModal } from 'ds-alurabooks'
import { useState } from 'react'
import imagemPrincipal from './assets/login.png'
import './ModalLoginUsuario.css'
import http from '../../http';

interface ModalLoginUsuarioProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const ModalLoginUsuario = ({ open, onClose, onLogin }: ModalLoginUsuarioProps) => {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usuario = { email, senha }

    http.post('public/login', usuario)
      .then((response) => {
        sessionStorage.setItem('token', response.data.access_token);
        setEmail('');
        setSenha('');
        onClose();
        onLogin();
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          alert(error);
        } else {
          alert('Aconteceu um erro inesperado ao realizar seu login!');
        }
      });
  }

  return (
    <AbModal
      titulo="Login"
      aberta={open}
      aoFechar={onClose}
    >
      <div className='corpoModalLogin'>
        <figure>
          <img src={imagemPrincipal} alt="Monitor com uma fechadura e uma pessoa com uma chave logo ao lado." />
        </figure>
        <form onSubmit={onSubmit}>

          <AbCampoTexto
            value={email}
            label='E-mail'
            onChange={setEmail}
          />
          <AbCampoTexto
            value={senha}
            label='Senha'
            onChange={setSenha}
          />
          <footer>
            <AbBotao texto='Login' />
          </footer>
        </form>
      </div>
    </AbModal>
  );
}

export default ModalLoginUsuario;