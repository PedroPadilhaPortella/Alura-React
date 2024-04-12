import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { IColaborador } from '../../interfaces/IColaborador';
import { ITime } from '../../interfaces/ITime';
import Button from '../Button';
import Dropdown from '../Dropdown';
import FormField from '../FormField';
import './style.css';

interface FormProps {
  times: string[]
  onAddTime: (time: ITime) => void;
  onAddColaborador: (colaborador: IColaborador) => void;
}

function Form(props: FormProps) {

  const [nome, setNome] = useState<string>('')
  const [cargo, setCargo] = useState<string>('')
  const [imagem, setImagem] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [data, setData] = useState<string>('')

  const [timeNome, setTimeNome] = useState<string>('')
  const [timeCor, setTimeCor] = useState<string>('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onAddColaborador({
      id: uuid(),
      nome,
      cargo,
      imagem,
      time,
      favorito: false,
      data
    });
    setNome('')
    setCargo('')
    setImagem('')
    setTime('')
  }

  const onSubmitTime = (event: React.FormEvent<HTMLFormElement>) => {
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
        <FormField
          label="Data de Entrada no time" required={false} type="date" value={data}
          placeholder="Digite a data de Entrada no time" onChange={value => setData(value)}
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