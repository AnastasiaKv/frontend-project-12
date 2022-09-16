import React from 'react';
import ReactDOM from 'react-dom/client';
import usePromise from 'react-promise';
import { Provider } from 'react-redux';
import './assets/index.scss';
import init from './init';
import store from './slices/index';

const InitApp = () => {
  const { value, loading } = usePromise(init);
  return loading ? null : value;
};

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store}>
    <InitApp />
  </Provider>,
);
