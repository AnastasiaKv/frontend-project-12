import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks';
import { actions } from '../../slices/modalSlice';
import ModalHeader from './ModalHeader';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useSocket();
  const { channelId } = useSelector((state) => state.modal.extra);

  const handleClose = () => dispatch(actions.close());

  const handleSubmit = async () => {
    try {
      await removeChannel({ id: channelId });
      toast.success(t('notifications.channelRemoved'));
      handleClose();
    } catch (error) {
      console.log('Remove channel error: ', error);
    }
  };

  return (
    <Modal show centered onHide={handleClose}>
      <ModalHeader title={t('modals.removeChannel')} closeHandler={handleClose} />
      <Modal.Body>{t('modals.areYouSure')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          {t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
