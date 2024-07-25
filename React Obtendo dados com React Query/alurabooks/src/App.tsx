import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import './App.css';
import Rotas from './rotas';

export const history = createBrowserHistory({ window })
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HistoryRouter history={history}>
        <Rotas />
      </HistoryRouter>
    </QueryClientProvider>
  );
}

export default App;
