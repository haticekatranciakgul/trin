import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import './style.css';

/**
 * GenericDatePicker - Modern, tutarlı yükseklikli datepicker component
 */
const GenericDatePicker = ({ type = 'date', value, onChange, label, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {type === 'date' && (
        <DatePicker
          label={label}
          sx={{ width: '100%' }}
          value={value}
          onChange={onChange}
          slots={(params) => <TextField {...params} className="generic-datepicker" />}
          {...props}
          slotProps={{textField:{size:'small'}}}
        />
      )}
      {type === 'year' && (
        <DatePicker
          views={['year']}
          label={label}
          sx={{ width: '100%' }}
          value={value}
          onChange={onChange}
          slots={(params) => <TextField {...params} className="generic-datepicker" />}
          {...props}
          slotProps={{textField:{size:'small'}}}
          
        />
      )}
      {type === 'month' && (
        <DatePicker
          views={['year', 'month']}
          openTo="month"
          width={'100%'}
          label={label}
          value={value}
          onChange={onChange}
          slots={(params) => <TextField {...params} className="generic-datepicker" />}
          {...props}
          slotProps={{ textField: { size: 'small' } }}
          sx={{  }}
        />
      )}
    </LocalizationProvider>
  );
};

GenericDatePicker.propTypes = {
  type: PropTypes.oneOf(['date', 'year', 'month']),
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default GenericDatePicker;
