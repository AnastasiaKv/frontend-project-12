import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes';
import Channels from './Channels';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const ChatPage = () => {
  const [content, setContent] = useState({});

  useEffect(() => {
    axios.get(routes.getDataPath(), { headers: getAuthHeader() })
      .then((response) => {
        console.log(response.data);
        setContent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(content);
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
      </div>
    </div>
  );
};

export default ChatPage;
