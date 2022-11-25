import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import MessageForm from './MessageForm';
import socket from '../socket';
import { actions } from '../slices/messagesSlice';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {`: ${body}`}
  </div>
);

const ChatRoom = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannel.id);
  const messages = useSelector((state) => state.messagesInfo.messages
    .filter((message) => message.channelId === currentChannelId));
  const messagesCount = messages.length;
  const currentChannelName = useSelector((state) => state.channelsInfo.channels
    .find(({ id }) => id === currentChannelId)?.name);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(actions.addMessage(payload));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">{ t('chatPage.messagesCounter.messagesCount', { count: messagesCount }) }</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map(({ id, username, body }) => (
            <Message key={id} username={username} body={body} />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm channelId={currentChannelId} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
