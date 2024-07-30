import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';

const Providers = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

export const renderWithProviders = (ui, options) => render(ui, { ...options, wrapper: Providers });

export * from '@testing-library/react';

export { renderWithProviders as render };
