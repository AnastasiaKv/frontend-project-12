import React from 'react';
import ReactDOM from 'react-dom/client';
import usePromise from 'react-promise';
import init from './init';

const InitApp = () => {
  const { value, loading } = usePromise(init);
  return loading ? null : value;
};

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(<InitApp />);
