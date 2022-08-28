import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

const customRender = (
  ui
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>
          {children}
        </Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper });
};
// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };