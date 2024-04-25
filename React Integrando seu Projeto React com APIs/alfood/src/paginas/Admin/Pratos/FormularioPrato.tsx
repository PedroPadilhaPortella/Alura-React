import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import { useNavigate, useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('')
  const [restaurante, setRestaurante] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<{ tags: ITag[] }>('/v2/tags/')
      .then(resposta => setTags(resposta.data.tags));

    http.get<IRestaurante[]>('/v2/restaurantes/')
      .then(resposta => setRestaurantes(resposta.data));

    if (params.id) {
      http.get<IPrato>(`/v2/pratos/${params.id}/`)
        .then((response) => {
          console.log(response);
          setNome(response.data.nome);
          setDescricao(response.data.descricao);
          setTag(response.data.tag);
          
          setRestaurante(restaurantes.find(
            (r) => r.id === response.data.restaurante)!.id.toString() || ''
          );

          http.get<File | null>(response.data.imagem).then((response) => setImagem(response.data));
        })
        .catch(erro => {
          console.log(erro)
        })
    }
  }, []);

  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImagem(event.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if (imagem) formData.append('imagem', imagem);

    http.request({
      url: '/v2/pratos/', method: 'POST', headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    })
      .then(() => {
        navigate('/admin/pratos');
      })
      .catch(error => console.log(error))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={onSubmitForm}>

        <TextField
          label="Nome do Prato"
          variant="standard" fullWidth required
          value={nome}
          onChange={e => setNome(e.target.value)}
          margin="dense"
        />

        <TextField
          label="Descrição"
          variant="standard" fullWidth required
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          margin="dense"
        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select labelId="select-tag"
            value={tag}
            onChange={e => setTag(e.target.value)}>
            {
              tags.map(tag => (
                <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select labelId="select-restaurante"
            value={restaurante}
            onChange={e => setRestaurante(e.target.value)}>
            {
              restaurantes.map(restaurante => (
                <MenuItem key={restaurante.id} value={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />

        <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
      </Box>
    </Box>
  );
}

export default FormularioPrato;