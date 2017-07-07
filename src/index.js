import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { theme } from './constants';
import configureStore from './init/configureStore';
import App from './App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
// registerServiceWorker();
