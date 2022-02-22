import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider , createTheme} from '@mui/material/styles'
import {store} from './store';
import './i18n'
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#007aff',
    },
    nav: {
      main: '#ffffff',
    },
    black: 'black',
    searchBase: '#f2f4f8',
    secondary: {
      main: '#f50057',
    },
    button: {
      main: '#000000',
      contrastText: '#fff',
    },
    divider: 'rgba(0,0,0,15)',
  },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
    <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
