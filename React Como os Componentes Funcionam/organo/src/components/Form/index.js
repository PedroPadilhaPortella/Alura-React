import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import FormField from '../FormField';
import Dropdown from '../Dropdown';
import Button from '../Button';
import './style.css';

function Form(props) {

  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [imagem, setImagem] = useState('')
  const [time, setTime] = useState('')

  const [timeNome, setTimeNome] = useState('')
  const [timeCor, setTimeCor] = useState('')

  const onSubmit = (event) => {
    event.preventDefault();
    props.onAddColaborador({
      id: uuid(),
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

  const onSubmitTime = (event) => {
    event.preventDefault();
    props.onAddTime({
      id: uuid(),
      name: timeNome,
      color: timeCor
    });
    setTimeNome('')
    setTimeCor('')
  }

  return (
    <section className="formulario">
      <form onSubmit={onSubmit}>
        <h2>Preencha os dados para criar o card do colaborador.</h2>
        <FormField
          label="Nome" required={true} type="text" value={nome}
          placeholder="Digite seu nome" onChange={value => setNome(value)}
        />
        <FormField
          label="Cargo" required={true} type="text" value={cargo}
          placeholder="Digite seu cargo" onChange={value => setCargo(value)}
        />
        <FormField
          label="Imagem" required={false} type="text" value={imagem}
          placeholder="Digite o caminho da imagem" onChange={value => setImagem(value)}
        />
        <Dropdown
          required={true} label="Time" value={time}
          items={props.times} onChange={value => setTime(value)}
        />
        <Button>Criar Card</Button>
      </form>

      <form onSubmit={onSubmitTime}>
        <h2>Preencha os dados para criar um novo time.</h2>
        <FormField
          label="Time" required={true} type="text" value={timeNome}
          placeholder="Digite o nome do time" onChange={value => setTimeNome(value)}
        />
        <FormField
          label="Cor" required={true} type="color" value={timeCor}
          placeholder="Digite a cor do time" onChange={value => setTimeCor(value)}
        />
        <Button>Criar novo Time</Button>
      </form>
    </section>
  );
}

export default Form;