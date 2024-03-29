import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Card, Col, Row, Container,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';
import routes from '../routes';
import avatar from '../assets/avatar_login.jpg';
import AuthAvatar from './AuthAvatar';
import AuthFormGroup from './AuthFormGroup';
import { loginSchema } from '../validationSchemas';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
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
    validationSchema: loginSchema(t),
    onSubmit: (values, helpers) => {
      setAuthFailed(false);
      axios.post(routes.loginPath(), values)
        .then(({ data }) => {
          logIn(data);
          navigate(routes.chatPage());
        })
        .catch((error) => {
          helpers.setSubmitting(false);
          if (!error.isAxiosError) {
            notify('unknown');
            return;
          }
          if (error.response?.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            notify('unauthorized');
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
              <AuthAvatar src={avatar} alt={t('authPages.login')} />
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('authPages.login')}</h1>
                <AuthFormGroup
                  name="username"
                  type="string"
                  autoComplete="username"
                  placeholder={t('authPages.nickname')}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  isInvalid={authFailed}
                  inputRef={inputRef}
                  label={t('authPages.nickname')}
                  disabled={formik.isSubmitting}
                />
                <AuthFormGroup
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={t('authPages.password')}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={authFailed}
                  label={t('authPages.password')}
                  feedback={authFailed && t('authPages.authFaild')}
                  disabled={formik.isSubmitting}
                />
                <Button className="my-3 w-100" variant="outline-primary" type="submit" disabled={formik.isSubmitting}>
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
