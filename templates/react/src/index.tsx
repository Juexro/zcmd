import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './styles/index.ts';
import RootRouter from './routes/RootRouter';
import stores from './stores';
import { GlobalStyle } from './styles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider {...stores}>
      <RootRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);