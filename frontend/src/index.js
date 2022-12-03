import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';

const runApp = () => {
  const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : null;
  const socket = io(URL);
  const root = ReactDOM.createRoot(document.getElementById('chat'));

  init(socket).then((app) => root.render(app));
};

runApp();
