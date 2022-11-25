import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import routes from '../routes';
import Channels from './Channels';
import ChatRoom from './ChatRoom';
import useAuth from '../hooks';
import getModal from './modals/index.js';
import { actions as channelsActions } from '../slices/channelsSlice';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const { isOpened, type } = useSelector((state) => state.modal);
  const Modal = getModal(type);

  useEffect(() => {
    const notify = (errorType) => toast.error(t(`errors.${errorType}`));

    axios.get(routes.getDataPath(), { headers: auth.getAuthHeader() })
      .then((response) => dispatch(channelsActions.setChannels(response.data)))
      .catch((error) => notify(error.isAxiosError ? 'network' : 'unknown'));
  }, [dispatch, auth, t]);

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
