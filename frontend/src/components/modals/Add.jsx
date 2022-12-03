import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useSocket } from '../../hooks';
import { actions as modalActions } from '../../slices/modalSlice';
import ModalHeader from './ModalHeader';
import { channelNameSchema } from '../../validationShemas';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { createChannel } = useSocket();
  const inputRef = useRef();
  const channelsNames = useSelector((state) => state.channelsInfo.channels)
    .map((channel) => channel.name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => dispatch(modalActions.close());

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameSchema(t, channelsNames),
    onSubmit: async ({ name }, { setSubmitting }) => {
      try {
        await createChannel({ name });
        toast.success(t('notifications.channelCreated'));
        handleClose();
      } catch (error) {
        setSubmitting(false);
        inputRef.current.select();
        console.log('Add new channel error: ', error);
      }
    },
  });

  return (
    <Modal show centered onHide={handleClose}>
      <ModalHeader title={t('modals.addChannel')} closeHandler={handleClose} />
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              id="addChannel"
              data-testid="addChannel"
              aria-label={t('modals.channelName')}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              ref={inputRef}
              required
            />
            <Form.Label visuallyHidden="true" htmlFor="addChannel">{t('modals.channelName')}</Form.Label>
            {formik.touched.name && formik.errors.name ? (
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.cancel')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          {t('modals.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
