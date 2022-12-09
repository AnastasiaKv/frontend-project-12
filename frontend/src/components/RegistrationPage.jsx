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
import avatar from '../assets/avatar_signup.jpg';
import AuthAvatar from './AuthAvatar';
import AuthFormGroup from './AuthFormGroup';
import { registrationSchema } from '../validationSchemas';

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
    validationSchema: registrationSchema(t),
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
              <AuthAvatar src={avatar} alt={t('authPages.registration')} />
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('authPages.registration')}</h1>
                <AuthFormGroup
                  name="username"
                  type="string"
                  placeholder={t('authPages.username')}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.username && formik.touched.username}
                  inputRef={inputRef}
                  label={t('authPages.username')}
                  feedback={signupFailed ? t('authPages.existedUser') : formik.errors.username}
                  disabled={formik.isSubmitting}
                />
                <AuthFormGroup
                  name="password"
                  type="password"
                  placeholder={t('authPages.password')}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.password && formik.touched.password}
                  label={t('authPages.password')}
                  feedback={formik.errors.password}
                  disabled={formik.isSubmitting}
                />
                <AuthFormGroup
                  name="passwordConfirm"
                  type="password"
                  placeholder={t('authPages.passwordConfirm')}
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.passwordConfirm && formik.touched.passwordConfirm}
                  label={t('authPages.passwordConfirm')}
                  feedback={formik.errors.passwordConfirm}
                  disabled={formik.isSubmitting}
                />
                <Button className="my-3 w-100" variant="outline-primary" type="submit" disabled={formik.isSubmitting}>
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
