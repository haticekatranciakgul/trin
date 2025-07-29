import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// Label'a göre tema renklerini döndür
const getIconBgColor = (label, theme) => {
  switch (label) {
    case 'Balance':
      return theme.palette.primary.light;
    case 'Income':
      return theme.palette.success.light;
    case 'Expense':
      return theme.palette.error.light;
    case 'Categories':
      return theme.palette.warning.light;
    default:
      return theme.palette.background.default;
  }
};
const getIconColor = (label, theme) => {
  switch (label) {
    case 'Balance':
      return theme.palette.primary.main;
    case 'Income':
      return theme.palette.success.main;
    case 'Expense':
      return theme.palette.error.main;
    case 'Categories':
      return theme.palette.warning.main;
    default:
      return theme.palette.text.primary;
  }
};
const getValueColor = (label, theme) => {
  switch (label) {
    case 'Balance':
      return theme.palette.primary.main;
    case 'Income':
      return theme.palette.success.main;
    case 'Expense':
      return theme.palette.error.main;
    case 'Categories':
      return theme.palette.warning.main;
    default:
      return theme.palette.text.primary;
  }
};

/**
 * Modern Dashboard Card - Theme uyumlu, MUI ile
 * - Header: ikon, başlık, değer, alt açıklama
 * - Content: children ile esnek içerik
 * - Renk, ikon arka planı, değer rengi, gölge, hover
 */
const CardCustom = (props) => {
  // Özel prop'ları Card'a iletmiyoruz
  const {
    icon,
    label,
    title,
    value,
    subtitle,
    iconColor,
    iconBgColor,
    children,
    sx = {},
    contentSx = {}, // Content kısmının stilini kontrol eden prop
    valueColor, // özel prop, Card'a iletilmemeli
    ...muiCardProps // sadece Card'ın desteklediği prop'lar
  } = props;

  const theme = useTheme();
  const resolvedIconBgColor = iconBgColor || getIconBgColor(label || title, theme);
  const resolvedIconColor = iconColor || getIconColor(label || title, theme);
  const resolvedValueColor = valueColor || getValueColor(label || title, theme);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '2px 12px 12px 2px rgb(180 50 183 / 8%)',
        p: 3,
        background: theme.palette.background.paper ,
       /*  transition: 'box-shadow 0.2s', */
        /* '&:hover': {
          boxShadow: 'none', // Hover'da da shadow yok
        }, */
        ...sx,
      }}
      {...muiCardProps}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: children ? 2 : 0 }}>
        <Box>
          {title && (
            <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mb: 0.5 }}>
              {title}
            </Typography>
          )}
          {value && (
            <Typography variant="h6" sx={{ color: resolvedValueColor, fontWeight: 700, lineHeight: 1.2 }}>
              {value}
            </Typography>
          )}
        </Box>
        {icon && (
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: resolvedIconBgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 2,
            }}
          >
            {React.cloneElement(icon, {
              style: { color: resolvedIconColor, fontSize: 28 },
            })}
          </Box>
        )}
      </Box>
      {/* Subtitle */}
      {subtitle && (
        <Typography variant="subtitle2" sx={{ color: subtitle.startsWith('+') ? theme.palette.success.main : subtitle.startsWith('-') ? theme.palette.error.main : theme.palette.text.secondary, fontWeight: 500, mt: 1 }}>
          {subtitle}
        </Typography>
      )}
      {/* Content */}
      {children && (
        <Box sx={{ mt: 2, ...contentSx }}>{children}</Box>
      )}
    </Card>
  );
};

CardCustom.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtitle: PropTypes.string,
  iconColor: PropTypes.string,
  iconBgColor: PropTypes.string,
  valueColor: PropTypes.string,
  contentSx: PropTypes.object,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default React.memo(CardCustom);