import React, {
  createContext, useEffect, useMemo, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

const DELAY = 3000;
const SocketContext = createContext({});

const withTimeoutAndAcknowledgement = (socket, event, data) => (
  new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/no-let
    let acknowledge = false;
    const timerId = setTimeout(() => {
      if (acknowledge) return;
      acknowledge = true;
      reject(new Error('Timeout error! The other side did not acknowledge the event in the given delay.'));
    }, DELAY);

    socket.volatile.emit(event, data, (response) => {
      if (acknowledge) return;
      clearTimeout(timerId);

      if (response.status === 'ok') {
        acknowledge = true;
        resolve(response.data);
      }
      reject(response.error);
    });
  })
);

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (data) => dispatch(messagesActions.addMessage(data)));
    socket.on('newChannel', (data) => dispatch(channelsActions.addChannel(data)));
    socket.on('removeChannel', (data) => dispatch(channelsActions.removeChannel(data)));
    socket.on('renameChannel', (data) => dispatch(channelsActions.renameChannel(data)));

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, socket]);

  const sendMessage = useCallback((data) => withTimeoutAndAcknowledgement(socket, 'newMessage', data), [socket]);
  const createChannel = useCallback((data) => withTimeoutAndAcknowledgement(socket, 'newChannel', data), [socket]);
  const removeChannel = useCallback((data) => withTimeoutAndAcknowledgement(socket, 'removeChannel', data), [socket]);
  const renameChannel = useCallback((data) => withTimeoutAndAcknowledgement(socket, 'renameChannel', data), [socket]);

  const socketApi = useMemo(() => ({
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel,
  }), [sendMessage, createChannel, removeChannel, renameChannel]);

  return (
    <SocketContext.Provider value={socketApi}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
