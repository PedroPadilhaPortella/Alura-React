import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  useEffect(() => {
    if (params.id) {
      http.get<IRestaurante>(`/v2/restaurantes/${params.id}/`)
        .then((response) => {
          setNomeRestaurante(response.data.nome);
        })
        .catch(erro => {
          console.log(erro)
        })
    }
  }, [params]);

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const restaurante = { nome: nomeRestaurante }

    if (params.id) {
      http.put<IRestaurante>(`/v2/restaurantes/${params.id}/`, restaurante)
        .then((response) => {
          navigate('/admin/restaurantes')
        })
        .catch(erro => {
          console.log(erro)
        })
    } else {
      http.post<IRestaurante>('/v2/restaurantes/', restaurante)
        .then((response) => {
          navigate('/admin/restaurantes')
        })
        .catch(erro => {
          console.log(erro)
        })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={onSubmitForm}>
        <TextField
          label="Nome do Restaurante"
          variant="standard" fullWidth required
          value={nomeRestaurante}
          onChange={e => setNomeRestaurante(e.target.value)}
        />
        <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
      </Box>
    </Box>
  );
}

export default FormularioRestaurante;