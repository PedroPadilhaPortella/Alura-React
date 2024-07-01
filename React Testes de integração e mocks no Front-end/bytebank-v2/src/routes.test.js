import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './paginas/Principal/App';
import AppRoutes from './routes';
import Cartoes from './componentes/Cartoes';

describe('Rotas', () => {
  test('Deve renderizar a rota principal', () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = screen.getByText('Olá, Joana :)!');
    expect(user).toBeInTheDocument();
  });

  test('Deve renderizar a rota de cartões', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='cartoes' element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');
    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });

  test('Deve renderizar a rota atual', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    const location = screen.getByTestId('local');
    expect(location).toHaveTextContent(rota);
  });

  test('Deve renderizar a página 404', () => {
    const rota = '/extrato';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const errorPage = screen.getByTestId('pagina-404');
    expect(errorPage).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});