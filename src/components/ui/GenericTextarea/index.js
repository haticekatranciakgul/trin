import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import './style.css';

const GenericTextarea = ({
  value,
  onChange,
  label = '',
  placeholder = '',
  minRows = 2,
  maxRows,
  sx = {},
  className = '',
  ...props
}) => (
  <TextField
    value={value}
    onChange={onChange}
    label={label}
    placeholder={placeholder}
    multiline
    minRows={minRows}
    maxRows={maxRows}
    className={`generic-textarea ${className}`}
    sx={{ width: '100%', fontSize: 16, borderRadius: 8, ...sx }}
    InputLabelProps={{ style: { fontSize: 16 } }}
    {...props}
  />
);

GenericTextarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  sx: PropTypes.object,
  className: PropTypes.string,
};

export default React.memo(GenericTextarea); 