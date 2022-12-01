import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import * as leoProfanity from 'leo-profanity';
import { ToastContainer } from 'react-toastify';
import resources from './locales/index.js';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import App from './components/App';
import store from './slices/index';
import setupRollbar from './rollbar';
import './assets/index.scss';

const init = async (socket) => {
  const rollbarConfig = setupRollbar();
  const i18n = i18next.createInstance();
  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <RollbarProvider config={rollbarConfig}>
            <ErrorBoundary>
              <SocketProvider socket={socket}>
                <AuthProvider>
                  <App />
                  <ToastContainer />
                </AuthProvider>
              </SocketProvider>
            </ErrorBoundary>
          </RollbarProvider>
        </Provider>
      </I18nextProvider>
    </React.StrictMode>
  );
};

export default init;
