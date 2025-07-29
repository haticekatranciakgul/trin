import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import './style.css';

const typeDefaults = {
  add:    { color: 'primary', icon: <AddIcon />, variant: 'contained' },
  income: { color: 'success', variant: 'outlined' },
  expense:{ color: 'error',   variant: 'outlined' },
  cancel: { color: 'primary', variant: 'outlined' },
  save:   { color: 'primary', icon: <SaveIcon />, variant: 'contained' },
  submit:   { color: 'primary', variant: 'contained' },

};

const TypeButton = ({
  type = 'add',
  label,
  color,
  size = 'small',
  icon,
  active = false,
  variant,
  onClick,
  className = '',
  ...rest
}) => {
  const btnColor = color || typeDefaults[type]?.color || 'primary';
  const btnIcon = icon !== undefined ? icon : typeDefaults[type]?.icon;
  const btnVariant = variant || typeDefaults[type]?.variant || 'contained';

  return (
    <Button
      className={`typeButton ${type} ${size} ${active ? 'active' : ''} ${className}`}
      variant={btnVariant}
      color={btnColor}
      size={size}
      startIcon={btnIcon}
      onClick={onClick}
      {...rest}
      sx={{ fontSize: '16px!important', width: '100%' }}
    >
      {label}
    </Button>
  );
};

TypeButton.propTypes = {
  type: PropTypes.oneOf(['add', 'income', 'expense', 'cancel', 'save', 'submit']),
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node,
  active: PropTypes.bool,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default TypeButton; 