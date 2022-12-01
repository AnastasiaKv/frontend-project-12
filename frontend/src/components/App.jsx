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
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import NotFoundPage from './NotFoundPage';
import { useAuth } from '../hooks';
import routes from '../routes';

const ChatRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return (
    loggedIn ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

const ChatNavbar = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" bg="white" variant="ligth" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatPage()}>{t('brand')}</Navbar.Brand>
        {loggedIn && <Button onClick={logOut}>{t('logout')}</Button>}
      </Container>
    </Navbar>
  );
};

const App = () => (
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
    </Router>
  </div>
);

export default App;
