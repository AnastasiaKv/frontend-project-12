import React from 'react';
import { useSelector } from 'react-redux';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  addChannel: Add,
  renameChannel: Rename,
  removeChannel: Remove,
};

const getModal = (modalName) => modals[modalName];

const Modal = () => {
  const { isOpened, type } = useSelector((state) => state.modal);
  const ModalComponent = getModal(type);

  return isOpened && <ModalComponent />;
};

export default Modal;
