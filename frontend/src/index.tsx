import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Paper } from '@mui/material';
import {Provider} from 'react-redux';
import {store } from './redux/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
        <App />
  </Provider>
);
