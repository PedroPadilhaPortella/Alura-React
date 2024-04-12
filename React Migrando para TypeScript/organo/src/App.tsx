import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Banner from './components/Banner';
import Form from './components/Form';
import Time from './components/Time';
import Footer from './components/Footer';
import { ITime } from './interfaces/ITime';
import { IColaborador } from './interfaces/IColaborador';

function App() {

  const timesMock: ITime[] = [
    {
      id: uuid(),
      name: 'Programação',
      color: '#57C278'
    },
    {
      id: uuid(),
      name: 'Front-End',
      color: '#82CFFA'
    },
    {
      id: uuid(),
      name: 'Data Science',
      color: '#A6D157'
    },
    {
      id: uuid(),
      name: 'Devops',
      color: '#E06B69'
    },
    {
      id: uuid(),
      name: 'UX e Design',
      color: '#DB6EBF'
    },
    {
      id: uuid(),
      name: 'Mobile',
      color: '#FFBA05'
    },
    {
      id: uuid(),
      name: 'Inovação e Gestão',
      color: '#FF8A29'
    }
  ];

  const colaboradoresMock: IColaborador[] = [
    {
      id: uuid(),
      nome: 'PAULO SILVEIRA',
      cargo: 'Hipster e CEO da Alura',
      imagem: 'https://www.alura.com.br/assets/img/lideres/paulo-silveira.1647533644.jpeg',
      time: 'Inovação e Gestão',
      data: '04/12/2024',
      favorito: false
    },
    {
      id: uuid(),
      nome: 'Pedro Portella',
      cargo: 'Desenvolvedor FullStack Node',
      imagem: 'https://github.com/PedroPadilhaPortella.png',
      time: 'Programação',
      data: '04/12/2024',
      favorito: true
    },
    {
      id: uuid(),
      nome: 'Daiane Fernandes',
      cargo: 'Desenvolvedora Web',
      imagem: 'https://github.com/daianesf.png',
      time: 'Front-End',
       data: '04/12/2024',
      favorito: true
    },
    {
      id: uuid(),
      nome: 'Mateus Honorato',
      cargo: 'Desenvolvedor Angular e Java',
      imagem: 'https://github.com/MatheusHonoratoDev.png',
      time: 'Front-End',
       data: '04/12/2024',
      favorito: false
    },
    {
      id: uuid(),
      nome: 'Fernando Luna',
      cargo: 'Gestor de Projetos',
      imagem: 'https://github.com/eusouofernando.png',
      time: 'Inovação e Gestão',
       data: '04/12/2024',
      favorito: false
    },
    {
      id: uuid(),
      nome: 'Maxel Udson',
      cargo: 'Desenvolvedor Java',
      imagem: 'https://github.com/Maxel-Uds.png',
      time: 'Programação',
       data: '04/12/2024',
      favorito: false
    },
    {
      id: uuid(),
      nome: 'João Vitor Casalli',
      cargo: 'Analista de Data Science',
      imagem: 'https://github.com/souza-joao.png',
      time: 'Data Science',
       data: '04/12/2024',
      favorito: false
    },
    {
      id: uuid(),
      nome: 'Maiki Ismene',
      cargo: 'Analista Frontend',
      imagem: 'https://github.com/ismenemaiki.png',
      time: 'Front-End',
       data: '04/12/2024',
      favorito: false
    },
    {
      id: uuid(),
      nome: 'Lucas Buisa Martinelli',
      cargo: 'Desenvolvedor Angular',
      imagem: 'https://github.com/LucasMartinelli.png',
      time: 'Front-End',
       data: '04/12/2024',
      favorito: false
    },
    {
      id: uuid(),
      nome: 'Daniel Portella',
      cargo: 'Desenvolvedor Node',
      imagem: 'https://github.com/Daniel-Portella.png',
      time: 'Programação',
       data: '04/12/2024',
      favorito: false
    },
  ]

  const [times, setTimes] = useState<ITime[]>(timesMock)
  const [colaboradores, setColaboradores] = useState<IColaborador[]>(colaboradoresMock)

  const onAddColaborador = (colaborador: IColaborador) => {
    setColaboradores([...colaboradores, colaborador])
  }

  const deleteColaborador = (colaborador: IColaborador) => {
    setColaboradores(colaboradores.filter((c) => c.id !== colaborador.id))
  }

  const toggleFavoriteColaborator = (selectedColaborador: IColaborador, toggle: boolean) => {
    setColaboradores(colaboradores.map(colaborador => {
      if (colaborador.id === selectedColaborador.id) {
        colaborador.favorito = toggle;
      }
      return colaborador;
    }));
  }

  const onAddTime = (time: ITime) => {
    setTimes([...times, time]);
    console.warn(times);
  }

  const updateTimeColor = (cor: string, selectedTime: ITime) => {
    setTimes(times.map(time => {
      if (time.name === selectedTime.name) {
        time.color = cor;
      }
      return time;
    }));
  }

  return (
    <div className="App">
      <Banner image='/imagens/banner.png' alt='Banner principal do Organo' />
      <section className="times">
        <h1>Minha organização</h1>
        {times.map((time, index) => <Time
          key={index}
          time={time}
          colaboradores={colaboradores.filter(colaborador => colaborador.time === time.name)}
          onDelete={deleteColaborador}
          onChangeColor={updateTimeColor}
          onFavorite={toggleFavoriteColaborator}
        />)}
      </section>
      <div className='formulario-title'>
        <h1 className=''>Faça parte desse time!</h1>
      </div>
      <Form
        times={times.map(time => time.name)}
        onAddColaborador={colaborator => onAddColaborador(colaborator)}
        onAddTime={time => onAddTime(time)}
      />
      <Footer />
    </div>
  );
}

export default App;
