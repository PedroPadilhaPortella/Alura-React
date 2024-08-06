import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import './App.css';
import AbApolloClient from './componentes/ApolloClient';
import Rotas from './rotas';

export const history = createBrowserHistory({ window })
const queryClient = new QueryClient();

function App() {
  return (
    <AbApolloClient>
      <QueryClientProvider client={queryClient}>
        <HistoryRouter history={history}>
          <Rotas />
        </HistoryRouter>
      </QueryClientProvider>
    </AbApolloClient>
  );
}

export default App;
