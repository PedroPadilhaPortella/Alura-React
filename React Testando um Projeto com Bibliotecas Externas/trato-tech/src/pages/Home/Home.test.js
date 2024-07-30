import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import Home from '.';
import { CATEGORIAS_MOCKS } from 'mocks/categorias';

jest.mock('services/categorias');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render categories', async () => {
    render(<Home />);
    const categorias = await screen.findAllByTestId('home-categorias');
    expect(categorias).toHaveLength(5);
  });

  it('should redirect to Anuncie page', () => {
    render(<Home />);
    const anuncieButton = screen.getByTestId('home-botao-anunciar');
    userEvent.click(anuncieButton);
    expect(mockNavigate).toHaveBeenCalledWith('/anuncie');
  });

  it('should redirect to the selected Category page', async () => {
    render(<Home />);
    const categorias = await screen.findAllByTestId('home-categorias');
    const categoriaButton = categorias[0];
    userEvent.click(categoriaButton);
    expect(mockNavigate).toHaveBeenCalledWith(`/categoria/${CATEGORIAS_MOCKS[0].id}`);
  });

});