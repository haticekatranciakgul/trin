import * as React from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./style.css";

/**
 * GenericDropdown - Tekrar kullanılabilir, dinamik MUI Select bileşeni
 * @param {string} id - Select ve label için benzersiz id (zorunlu)
 * @param {string} label - InputLabel metni (zorunlu)
 * @param {any} value - Seçili değer (zorunlu)
 * @param {function} onChange - Değişim fonksiyonu (zorunlu)
 * @param {Array} options - { value, label } objelerinden oluşan seçenekler (zorunlu)
 * @param {string} [helperText] - Alt açıklama metni (opsiyonel)
 * @param {boolean} [disabled] - Pasiflik durumu (opsiyonel)
 * @param {string} [className] - Ekstra className (opsiyonel)
 */
const GenericDropdown = ({
  id,
  label,
  value,
  onChange,
  options,
  helperText,
  disabled = false,
  className = "",
}) => {
  const labelId = `${id}-label`;

  return (
    <FormControl sx={{ width: '100%' }} size="small" disabled={disabled} className={className}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

GenericDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })
  ).isRequired,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default GenericDropdown;
