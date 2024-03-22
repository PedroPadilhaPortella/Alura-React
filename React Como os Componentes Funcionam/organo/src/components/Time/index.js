import './style.css';
import hexToRgba from 'hex-to-rgba';
import Colaborador from '../Colaborador';

function Time({ time, colaboradores, onDelete, onChangeColor, onFavorite }) {

  const sectionStyle = { backgroundColor: hexToRgba(time.color, '0.8'), backgroundImage: 'url(/imagens/fundo.png)' }
  const h3Style = { borderColor: time.color }

  return (
    (colaboradores.length > 0) ?
      <section className='time' style={sectionStyle}>
        <input type="color" className='input-color' 
          value={time.color} 
          onChange={(e) => onChangeColor(e.target.value, time)} 
        />
        <h3 style={h3Style}>{time.name}</h3>
        <div className='colaboradores'>
          {colaboradores.map((colaborador, index) => {
            return <Colaborador
              key={colaborador.id}
              colaborador={colaborador}
              backgroundColor={time.color}
              onDelete={onDelete}
              onFavorite={onFavorite}
            />
          })}
        </div>
      </section> : ''
  );
}

export default Time;