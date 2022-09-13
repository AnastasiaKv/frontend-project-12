import { useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Button, Navbar, Container, Col, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import NotFoundPage from './NotFoundPage';
import AuthContext from '../contexts';
import useAuth from '../hooks';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const authContextProviderValue = useMemo(() => (
    { loggedIn, logIn, logOut }
  ), [loggedIn, logIn, logOut]);

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn && <Button onClick={auth.logOut}>{t('logout')}</Button>
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="shadow-sm" bg="white" variant="ligth" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>

        <Container fluid className="h-100">
          <Row className="justify-content-center align-content-center h-100">
            <Col xs="12" md="8" xxl="6">
              <Routes>
                <Route
                  path="/"
                  element={(
                    <ChatRoute>
                      <ChatPage />
                    </ChatRoute>
                  )}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegistrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  </AuthProvider>
);

export default App;
