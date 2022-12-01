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
import { useAuth } from '../hooks';
import routes from '../routes';
import avatar from '../assets/avatar_signup.jpg';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const inputRef = useRef();

  const [signupFailed, setSignupFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const notify = (errorType) => toast.error(t(`errors.${errorType}`));

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, t('authPages.usernameLength'))
        .max(20, t('authPages.usernameLength'))
        .required(t('required')),
      password: yup.string()
        .min(6, t('authPages.passwordLength'))
        .required(t('required')),
      passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], t('authPages.passwordsMatch'))
        .required(t('required')),
    }),
    onSubmit: (values) => {
      setSignupFailed(false);
      const { username, password } = values;
      axios.post(routes.signupPath(), { username, password })
        .then(({ data }) => {
          logIn(data);
          navigate(routes.chatPage());
        })
        .catch((error) => {
          if (!error.isAxiosError) {
            notify('unknown');
            return;
          }
          if (error.response?.status === 409) {
            setSignupFailed(true);
            formik.errors.username = t('authPages.existedUser');
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
                <img className="rounded-circle" src={avatar} width="200px" height="200px" alt={t('authPages.registration')} />
              </Col>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('authPages.registration')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    placeholder={t('authPages.username')}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.errors.username && formik.touched.username}
                    ref={inputRef}
                    required
                  />
                  <Form.Label htmlFor="username">{t('authPages.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {signupFailed ? t('authPages.existedUser') : formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t('authPages.password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.errors.password && formik.touched.password}
                    required
                  />
                  <Form.Label htmlFor="password">{t('authPages.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    placeholder={t('authPages.passwordConfirm')}
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.errors.passwordConfirm && formik.touched.passwordConfirm}
                    required
                  />
                  <Form.Label htmlFor="passwordConfirm">{t('authPages.passwordConfirm')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="my-3 w-100" variant="outline-primary" type="submit">
                  {t('authPages.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
