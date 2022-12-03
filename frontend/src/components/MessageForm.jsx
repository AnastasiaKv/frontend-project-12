import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as filter from 'leo-profanity';
import { ReactComponent as SentButton } from '../assets/sent_btn.svg';
import { useAuth, useSocket } from '../hooks';
import { messageSchema } from '../validationShemas';

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const { sendMessage } = useSocket();
  const inputRef = useRef();
  const { user: { username } } = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const formik = useFormik({
    initialValues: {
      newMessage: '',
    },
    validationSchema: messageSchema(),
    onSubmit: async (values, { resetForm }) => {
      const cleanMessage = filter.clean(values.newMessage);
      try {
        await sendMessage({ body: cleanMessage, channelId, username });
        resetForm();
      } catch (error) {
        console.log('Send message error: ', error);
      }
      inputRef.current.focus();
    },
  });

  return (
    <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <Form.Control
          className="border-0 p-0 ps-2"
          name="newMessage"
          id="newMessage"
          data-testid="newMessage"
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
