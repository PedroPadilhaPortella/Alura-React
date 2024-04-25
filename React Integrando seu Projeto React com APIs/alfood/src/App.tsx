import { Route, Routes } from 'react-router-dom';
import AdminBasePage from './paginas/Admin';
import AdminPratos from './paginas/Admin/Pratos';
import FormularioPrato from './paginas/Admin/Pratos/FormularioPrato';
import AdminRestaurantes from './paginas/Admin/Restaurantes';
import FormularioRestaurante from './paginas/Admin/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<AdminBasePage />} >
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdminPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
      </Route>

    </Routes>
  );
}

export default App;
