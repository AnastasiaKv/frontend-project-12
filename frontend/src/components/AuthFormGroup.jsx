import React from 'react';
import { Form } from 'react-bootstrap';

const AuthFormGroup = ({
  name, type, placeholder, autoComplete, value, onChange,
  onBlur, isInvalid, inputRef, label, feedback, disabled,
}) => (
  <Form.Group className="form-floating mb-3">
    <Form.Control
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete || 'off'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={isInvalid}
      ref={inputRef}
      disabled={disabled}
      required
    />
    <Form.Label htmlFor={name}>{label}</Form.Label>
    {feedback && (
      <Form.Control.Feedback type="invalid" tooltip>
        {feedback}
      </Form.Control.Feedback>
    )}
  </Form.Group>
);

export default AuthFormGroup;
