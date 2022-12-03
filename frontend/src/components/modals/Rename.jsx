import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSocket } from '../../hooks';
import { actions } from '../../slices/modalSlice';

const Rename = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameChannel } = useSocket();
  const inputRef = useRef();
  const { channels } = useSelector((state) => state.channelsInfo);
  const { channelId } = useSelector((state) => state.modal.extra);
  const channelName = channels.find((channel) => channel.id === channelId)?.name;
  const restChannelsNames = channels
    .filter(({ id }) => id !== channelId)
    .map((channel) => channel.name);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleClose = () => dispatch(actions.close());

  const formik = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema: yup.object({
      name: yup.string().trim()
        .min(3, t('modals.nameLength'))
        .max(20, t('modals.nameLength'))
        .notOneOf(restChannelsNames, t('modals.uniqueName'))
        .required(t('required')),
    }),
    onSubmit: async ({ name }, { setSubmitting }) => {
      try {
        await renameChannel({ id: channelId, name });
        toast.success(t('notifications.channelRenamed'));
        handleClose();
      } catch (error) {
        setSubmitting(false);
        inputRef.current.select();
        console.log('Rename channel error: ', error);
      }
    },
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              id="renameChannel"
              data-testid="renameChannel"
              aria-label={t('modals.channelName')}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              ref={inputRef}
              required
            />
            <Form.Label visuallyHidden="true" htmlFor="renameChannel">{t('modals.channelName')}</Form.Label>
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

export default Rename;
