import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdminPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const linkStyle = {
    textDecoration: 'none'
  }

  useEffect(() => {
    http.get<IRestaurante[]>('/v2/restaurantes/')
      .then(resposta => setRestaurantes(resposta.data));

    http.get<IPrato[]>('/v2/pratos/')
      .then((response) => {
        setPratos(response.data.map(
          (prato) => ({...prato, restaurante: formatRestaurante(prato.restaurante) })
        ))
      })
      .catch(erro => {
        console.log(erro)
      })
  }, []);

  const formatRestaurante = (restauranteId: string | number) => {
    return restaurantes.find((r) => r.id === restauranteId)?.nome || ''
  }

  const deleteItem = (prato: IPrato) => {
    http.delete(`/v2/pratos/${prato.id}/`)
      .then((response) => {
        setPratos(pratos.filter(p => p.id !== prato.id));
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Restaurante</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            pratos.map((prato) => (
              <TableRow key={prato.id}>
                <TableCell>{prato.nome}</TableCell>
                <TableCell>{prato.descricao}</TableCell>
                <TableCell>{prato.tag}</TableCell>
                <TableCell>{prato.restaurante}</TableCell>
                <TableCell>
                  [<a href={prato.imagem} target="_blank" rel="noreferrer">Ver Imagem</a>]
                </TableCell>
                <TableCell>
                  <ButtonGroup variant="text" color="warning">
                    <Link style={linkStyle} to={`/admin/pratos/${prato.id}`}>
                      <Button variant="text" color="warning">Editar</Button>
                    </Link>
                    <Button variant="text" color="error" onClick={() => deleteItem(prato)}>
                      Excluir
                    </Button >
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminPratos;