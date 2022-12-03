import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalHeader = ({ title, closeHandler }) => (
  <Modal.Header closeButton onHide={closeHandler}>
    <Modal.Title>{title}</Modal.Title>
  </Modal.Header>
);

export default ModalHeader;
