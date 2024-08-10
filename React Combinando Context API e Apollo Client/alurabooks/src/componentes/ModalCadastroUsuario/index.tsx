import { AbBotao, AbCampoTexto, AbModal } from 'ds-alurabooks'
import { useState } from 'react'
import imagemPrincipal from './assets/login.png'
import './ModalCadastroUsuario.css'
import http from '../../http'

interface ModalCadastroUsuarioProps {
  open: boolean;
  onClose: () => void;
}

const ModalCadastroUsuario = ({ open, onClose }: ModalCadastroUsuarioProps) => {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [complemento, setComplemento] = useState('')
  const [cep, setCep] = useState('')
  const [senha, setSenha] = useState('')
  const [senhaConfirmada, setSenhaConfirmada] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usuario = {
      nome,
      email,
      senha,
      endereco,
      cep,
      complemento,
    }

    http.post('public/registrar', usuario)
      .then(() => {
        alert('Usuário foi cadastrado com sucesso!');
        setNome('');
        setEmail('');
        setEndereco('');
        setComplemento('');
        setCep('');
        setSenha('');
        setSenhaConfirmada('');
        onClose();
      })
      .catch(() => {
        alert('OPS! Alguma coisa deu errado!');
      });
  }

  return (
    <AbModal
      titulo="Cadastrar"
      aberta={open}
      aoFechar={onClose}
    >
      <div className='corpoModalCadastro'>
        <figure>
          <img src={imagemPrincipal} alt="Monitor com uma fechadura e uma pessoa com uma chave logo ao lado." />
        </figure>

        <form onSubmit={onSubmit}>
          <AbCampoTexto
            value={nome}
            label='Nome'
            onChange={setNome}
          />
          <AbCampoTexto
            value={email}
            label='E-mail'
            onChange={setEmail}
          />
          <AbCampoTexto
            value={endereco}
            label='Endereço'
            onChange={setEndereco}
          />
          <AbCampoTexto
            value={complemento}
            label='Complemento'
            onChange={setComplemento}
          />
          <AbCampoTexto
            value={cep}
            label='CEP'
            onChange={setCep}
          />
          <AbCampoTexto
            value={senha}
            label='Senha'
            onChange={setSenha}
          />
          <AbCampoTexto
            value={senhaConfirmada}
            label='Confirmar senha'
            onChange={setSenhaConfirmada}
          />
          <footer>
            <AbBotao texto='Cadastrar' />
          </footer>
        </form>
      </div>
    </AbModal>
  );
}

export default ModalCadastroUsuario;