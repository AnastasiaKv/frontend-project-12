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
  Button, Navbar, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import NotFoundPage from './NotFoundPage';
import AuthContext from '../contexts';
import useAuth from '../hooks';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  const authContextProviderValue = useMemo(() => (
    {
      loggedIn, logIn, logOut, getAuthHeader,
    }
  ), [loggedIn]);

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

const ChatNavbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" bg="white" variant="ligth" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatPage()}>{t('brand')}</Navbar.Brand>
        {auth.loggedIn && <Button onClick={auth.logOut}>{t('logout')}</Button>}
      </Container>
    </Navbar>
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Router>
        <ChatNavbar />
        <Routes>
          <Route
            path={routes.chatPage()}
            element={(
              <ChatRoute>
                <ChatPage />
              </ChatRoute>
            )}
          />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signupPage()} element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  </AuthProvider>
);

export default App;
