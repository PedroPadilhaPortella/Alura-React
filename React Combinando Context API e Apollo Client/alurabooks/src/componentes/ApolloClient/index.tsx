import { ReactElement } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache(),
});

type ApolloClientProps = {
  children: ReactElement;
}

const AbApolloClient = ({ children }: ApolloClientProps) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default AbApolloClient;