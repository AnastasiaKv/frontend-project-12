import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';

const runApp = () => {
  console.log(process.env.PORT);
  const URL = `http://localhost:${process.env.PORT || '5001'}`;
  const socket = io(URL);
  const root = ReactDOM.createRoot(document.getElementById('chat'));

  init(socket).then((app) => root.render(app));
};

runApp();
