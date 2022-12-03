import React from 'react';
import { Col } from 'react-bootstrap';

const AuthAvatar = ({ src, alt }) => (
  <Col xs="12" md="6" className="d-flex align-items-center justify-content-center">
    <img className="rounded-circle" src={src} width="200px" height="200px" alt={alt} />
  </Col>
);

export default AuthAvatar;
