import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/index';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </SnackbarProvider>,
  document.getElementById('root')
);
