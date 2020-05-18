import React from 'react';
import { FormHelperText } from '@material-ui/core';

const ErrorText = ({ error, touched, paddingLeft = 0 }) =>
  touched && error ? (
    <FormHelperText id="component-error-text" style={{ color: '#f44336', paddingLeft }}>
      {error}
    </FormHelperText>
  ) : null;

export default ErrorText;
