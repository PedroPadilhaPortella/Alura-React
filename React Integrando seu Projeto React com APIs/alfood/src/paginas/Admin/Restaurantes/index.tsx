import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdminRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const linkStyle = {
    textDecoration: 'none'
  }

  useEffect(() => {
    http.get<IRestaurante[]>('/v2/restaurantes/')
      .then((response) => {
        setRestaurantes(response.data)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, []);

  const deleteItem = (restaurante: IRestaurante) => {
    http.delete(`/v2/restaurantes/${restaurante.id}/`)
      .then((response) => {
        setRestaurantes(restaurantes.filter(r => r.id !== restaurante.id));
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
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            restaurantes.map((restaurante) => (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
                <TableCell>
                  <ButtonGroup variant="text" color="warning">
                    <Link style={linkStyle} to={`/admin/restaurantes/${restaurante.id}`}>
                      <Button variant="text" color="warning">Editar</Button>
                    </Link>
                    <Button variant="text" color="error" onClick={() => deleteItem(restaurante)}>
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

export default AdminRestaurantes;