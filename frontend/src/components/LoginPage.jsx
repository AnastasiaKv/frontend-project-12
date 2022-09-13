import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Col,
} from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks';
import routes from '../routes';
import avatar from '../assets/avatar.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();

  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      setAuthFailed(false);
      axios.post(routes.loginPath(), values)
        .then(({ data }) => {
          localStorage.setItem('userId', JSON.stringify(data));
          auth.logIn();
          navigate('/');
        })
        .catch((error) => {
          if (error.isAxiosError && !error.response.status === 401) {
            throw error;
          }
          formik.setSubmitting(false);
          setAuthFailed(true);
          inputRef.current.select();
        });
    },
  });

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
          <img className="rounded-circle" src={avatar} width="200px" height="200px" alt="Войти" />
        </Col>
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              id="username"
              name="username"
              autoComplete="username"
              placeholder={t('loginPage.username')}
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={authFailed}
              ref={inputRef}
              required
            />
            <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder={t('loginPage.password')}
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={authFailed}
              required
            />
            <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
            { authFailed && (
              <Form.Control.Feedback type="invalid" tooltip>
                {t('loginPage.authFaild')}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button className="my-3 w-100" variant="outline-primary" type="submit">
            {t('loginPage.login')}
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="p-4">
        <div className="text-center">
          <span>{t('loginPage.noAccaount')}</span>
          <a href="/signup">{t('loginPage.registration')}</a>
        </div>
      </Card.Footer>
    </Card>

  );
};

export default LoginPage;
