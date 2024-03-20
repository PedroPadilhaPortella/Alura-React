import { useState } from 'react';
import TextField from '../TextField';
import Dropdown from '../Dropdown';
import Button from '../Button';
import './style.css';

function Form(props) {
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [imagem, setImagem] = useState('')
  const [time, setTime] = useState('')

  const onSubmit = (event) => {
    event.preventDefault();
    props.onAddColaborador({
      nome,
      cargo,
      imagem,
      time
    });
    setNome('')
    setCargo('')
    setImagem('')
    setTime('')
  }

  return (
    <section className="formulario">
      <form onSubmit={onSubmit}>
        <h2>Preencha os dados para criar o card do colaborador.</h2>
        <TextField
          required={true} label="Nome" value={nome}
          placeholder="Digite seu nome" onChange={value => setNome(value)}
        />
        <TextField
          required={true} label="Cargo" value={cargo}
          placeholder="Digite seu cargo" onChange={value => setCargo(value)}
        />
        <TextField
          required={false} label="Imagem" value={imagem}
          placeholder="Digite o caminho da imagem" onChange={value => setImagem(value)}
        />
        <Dropdown
          required={true} label="Time" value={time}
          items={props.times} onChange={value => setTime(value)} />
        <Button>
          Criar Card
        </Button>
      </form>
    </section>
  );
}

export default Form;