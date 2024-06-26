import React, { useState } from 'react';
import style from './Filtro.module.scss';
import { useSetRecoilState } from 'recoil';
import { eventsFilter } from '../../state/atom';
import { IEventFilter } from '../../interfaces/IEventFilter';

const Filtro: React.FC = () => {

  const [data, setData] = useState('')
  const setEventFilter = useSetRecoilState<IEventFilter>(eventsFilter);

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const filter: IEventFilter = {}
    filter.data = data ? new Date(data) : null;
    setEventFilter(filter);
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por data</h3>
    <input
      type="date"
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)}
      placeholder="Por data"
      value={data} 
    />
    <button className={style.botao}>Filtrar</button>
  </form>)
}

export default Filtro