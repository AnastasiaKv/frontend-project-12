import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Nav } from 'react-bootstrap';
import { ReactComponent as AddButton } from '../assets/add_btn.svg';

const Channels = () => {
  const { t } = useTranslation();

  return (
    <Col className="border-end pt-5 px-0 bg-light" xs="4" md="2">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chatPage.channels')}</span>
        <Button className="btn-group-vertical p-0 text-primary" variant="light">
          <AddButton />
        </Button>
      </div>
      <Nav className="px-2 flex-column justify-content-left" as="ul" variant="pills" fill justify="left">
        <Nav.Item as="li">
          <Button className="w-100 rounded-0 text-start" variant="light">
            <span className="me-1">#</span>
            general
          </Button>
        </Nav.Item>
        <Nav.Item as="li">
          <Button className="w-100 rounded-0 text-start" variant="secondary">
            <span className="me-1">#</span>
            random
          </Button>
        </Nav.Item>
      </Nav>
    </Col>
  );
};

export default Channels;
