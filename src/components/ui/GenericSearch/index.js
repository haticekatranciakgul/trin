import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import "./style.css";

const GenericSearch = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) => (
  <Box
    component="form"
    sx={{ '& > :not(style)': {  width: '100%' } }}
    noValidate
    autoComplete="off"
  >
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

GenericSearch.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default GenericSearch; 