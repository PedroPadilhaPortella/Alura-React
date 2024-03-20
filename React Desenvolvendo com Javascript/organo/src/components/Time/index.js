import './style.css';
import Colaborador from '../Colaborador';

function Time(props) {

  const sectionStyle = { backgroundColor: props.secondaryColor }
  const h3Style = { borderColor: props.primaryColor }

  return (
    (props.colaboradores.length > 0) ?
      <section className='time' style={sectionStyle}>
        <h3 style={h3Style}>{props.name}</h3>
        <div className='colaboradores'>
          {props.colaboradores.map(colaborador => <Colaborador
            key={colaborador.nome}
            nome={colaborador.nome}
            cargo={colaborador.cargo}
            imagem={colaborador.imagem}
            backgroundColor={props.primaryColor}
          />)}
        </div>
      </section> : ''
  );
}

export default Time;