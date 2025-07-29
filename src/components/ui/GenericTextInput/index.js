import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import './style.css';

const GenericTextInput = ({
  value,
  onChange,
  label = '',
  type = 'text',
  placeholder = '',
  multiline = false,
  minRows = 1,
  maxRows,
  sx = {},
  className = '',
  ...props
}) => (
  <TextField
    value={value}
    onChange={onChange}
    label={label}
    type={type}
    placeholder={placeholder}
    multiline={multiline}
    minRows={minRows}
    maxRows={maxRows}
    size="small"
    className={`generic-text-input ${className}`}
    sx={{ ...sx }}
    {...props}
  />
);

GenericTextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  sx: PropTypes.object,
  className: PropTypes.string,
};

export default React.memo(GenericTextInput); 