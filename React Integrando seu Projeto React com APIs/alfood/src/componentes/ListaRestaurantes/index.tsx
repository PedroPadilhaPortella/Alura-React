import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import http from '../../http';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const formBoxStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>('');
  const [previousPageUrl, setPreviousPageUrl] = useState<string>('');
  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')

  useEffect(() => {
    carregarDados('/v1/restaurantes/')
  }, [])

  const carregarDados = (url: string, options: AxiosRequestConfig = {}) => {
    http.get<IPaginacao<IRestaurante>>(url, options)
      .then((response) => {
        setRestaurantes(response.data.results)
        setNextPageUrl(response.data.next)
        setPreviousPageUrl(response.data.previous)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const buscar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const opcoes = { params: {} as IParametrosBusca }
    if (busca) {
      opcoes.params.search = busca
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }
    carregarDados('/v1/restaurantes/', opcoes)
  }

  return (
    <section className={style.ListaRestaurantes}>
      <Box component="form" onSubmit={buscar}
        sx={formBoxStyles}>
        <FormControl>
          <TextField
            label="Busque por restaurantes"
            variant="outlined" fullWidth
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="label-ordenacao">Ordernação</InputLabel>
          <Select
            labelId="label-ordenacao"
            id="select-ordenacao"
            autoWidth
            value={ordenacao}
            label="Ordenar"
            onChange={evento => setOrdenacao(evento.target.value)}
          >
            <MenuItem value="">Padrão</MenuItem>
            <MenuItem value="id">Por Id</MenuItem>
            <MenuItem value="nome">Por Nome</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button type='submit' variant="text">Buscar</Button>
        </div>
      </Box>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {
        restaurantes?.map(item => (
          <Restaurante restaurante={item} key={item.id} />
        ))
      }
      <Button onClick={() => carregarDados(previousPageUrl)} disabled={!previousPageUrl}>
        Página Anterior
      </Button>
      <Button onClick={() => carregarDados(nextPageUrl)} disabled={!nextPageUrl}>
        Próxima página
      </Button>
    </section>
  )
}

export default ListaRestaurantes