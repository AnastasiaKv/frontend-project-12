import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Col, Row, Container,
} from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks';
import routes from '../routes';
import avatar from '../assets/avatar_login.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();

  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const notify = (errorType) => toast.error(t(`errors.${errorType}`));

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(t('required')),
      password: yup.string().trim().required(t('required')),
    }),
    onSubmit: (values) => {
      setAuthFailed(false);
      axios.post(routes.loginPath(), values)
        .then(({ data }) => {
          auth.logIn(data);
          navigate(routes.chatPage());
        })
        .catch((error) => {
          if (!error.isAxiosError) {
            notify('unknown');
            return;
          }
          if (error.response?.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
          } else notify('network');
        });
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={avatar} width="200px" height="200px" alt={t('authPages.login')} />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('authPages.login')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder={t('authPages.nickname')}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={authFailed}
                    ref={inputRef}
                    required
                  />
                  <Form.Label htmlFor="username">{t('authPages.nickname')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder={t('authPages.password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">{t('authPages.password')}</Form.Label>
                  { authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('authPages.authFaild')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button className="my-3 w-100" variant="outline-primary" type="submit">
                  {t('authPages.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('authPages.noAccount')}</span>
                <a href={routes.signupPage()}>{t('authPages.registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
