import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Channels from './Channels';
import ChatRoom from './ChatRoom';
import { useAuth } from '../hooks';
import getModal from './modals/index.js';
import { fetchData } from '../slices/channelsSlice';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const { isOpened, type } = useSelector((state) => state.modal);
  const Modal = getModal(type);

  useEffect(() => {
    try {
      const headers = { headers: getAuthHeader() };
      dispatch(fetchData(headers));
    } catch (error) {
      toast.error(t(`errors.${error.isAxiosError ? 'network' : 'unknown'}`));
    }
  }, []);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <ChatRoom />
        </div>
      </div>
      { isOpened && <Modal />}
    </>
  );
};

export default ChatPage;
