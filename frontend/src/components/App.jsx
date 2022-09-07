import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    axios.post('/api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
      console.log(response.data);
    });
    axios.get('/').then((response) => {
      console.log(response.data);
    });
  }, []);

  return <h1>Hexlet Chat</h1>;
};

export default App;
