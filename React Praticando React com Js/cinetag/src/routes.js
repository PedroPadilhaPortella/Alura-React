import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FavoritosProvider from 'contextos/FavoritosContext';
import Favoritos from 'pages/Favoritos';
import Inicio from "pages/Inicio";
import NaoEncontrada from "pages/NaoEncontrada";
import PaginaBase from "pages/PaginaBase";
import Player from "pages/Player";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <FavoritosProvider>
        <Routes>
          <Route path="/" element={<PaginaBase />}>
            <Route index element={<Inicio />} ></Route>
            <Route path='favoritos' element={<Favoritos />} ></Route>
            <Route path=':id' element={<Player />} ></Route>
            <Route path="*" element={<NaoEncontrada />}></Route>
          </Route>
        </Routes>
      </FavoritosProvider>
    </BrowserRouter>
  );
}