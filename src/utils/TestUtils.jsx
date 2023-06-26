import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store as reduxStore } from '../states/store';

const Store = reduxStore;

export const renderWithRedux = (
  component,
  { initialState, store = Store, ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  };
  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions })
  };
};
