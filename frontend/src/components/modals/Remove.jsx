import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks';
import { actions } from '../../slices/modalSlice';
import ModalHeader from './ModalHeader';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { removeChannel } = useApi();
  const { channelId } = useSelector((state) => state.modal.extra);

  const handleClose = () => dispatch(actions.close());

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await removeChannel({ id: channelId });
      toast.success(t('notifications.channelRemoved'));
      handleClose();
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.log('Remove channel error: ', error);
    }
  };

  return (
    <Modal show centered onHide={handleClose}>
      <ModalHeader title={t('modals.removeChannel')} closeHandler={handleClose} />
      <Modal.Body>{t('modals.areYouSure')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleSubmit} disabled={isSubmitting}>
          {t('modals.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
