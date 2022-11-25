import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Avatar } from '../assets/avatar_notfound.svg';
import routes from '../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Avatar className="img-fluid h-25" />
      <h1 className="h4 text-muted">
        {t('notFoundPage.title')}
      </h1>
      <p className="text-muted">
        {t('notFoundPage.message')}
        <a href={routes.chatPage()}>{t('notFoundPage.homeLink')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
