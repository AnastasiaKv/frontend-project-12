import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import * as filter from 'leo-profanity';
import { ReactComponent as SentButton } from '../assets/sent_btn.svg';
import socket from '../socket';

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const { username } = JSON.parse(localStorage.getItem('user'));
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const formik = useFormik({
    initialValues: {
      newMessage: '',
    },
    validationSchema: yup.object({
      newMessage: yup.string().trim().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      const cleanMessage = filter.clean(values.newMessage);
      socket.emit('newMessage', { body: cleanMessage, channelId, username }, (response) => {
        if (response.status === 'ok') {
          resetForm();
        } else {
          console.log('Send message error. Emit response: ', response);
        }
      });
      inputRef.current.focus();
    },
  });

  return (
    <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <Form.Control
          className="border-0 p-0 ps-2"
          name="newMessage"
          placeholder={t('chatPage.enterMessage')}
          aria-label={t('chatPage.newMessage')}
          value={formik.values.newMessage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          ref={inputRef}
          required
        />
        <Button className="btn-group-vertical" type="submit" variant="light" disabled={!formik.dirty || !formik.isValid}>
          <SentButton />
          <span className="visually-hidden">{t('chatPage.send')}</span>
        </Button>
      </div>
    </Form>
  );
};

export default MessageForm;
