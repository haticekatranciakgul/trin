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
const CardCustomUp = (props) => {
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
    valueColor, // olası özel prop
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
        /* transition: 'box-shadow 0.2s', */
       /*  '&:hover': {
          boxShadow: '0 4px 24px 0 rgba(31,41,55,0.14)',
        }, */
        ...sx,
      }}
      {...muiCardProps}
    >
      {/* Header: Solda başlık ve değer, sağda ikon */}
      <Box className="cardcustomup-header" sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: children ? 2 : 0 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {title && (
            <Typography variant="subtitle1" className="cardcustomup-title" sx={{ color: theme.palette.text.secondary, fontWeight: 600, mb: 0.5, textAlign: 'left' }}>
              {title}
            </Typography>
          )}
          {value && (
            <Typography variant="h4" className="cardcustomup-value" sx={{ color: resolvedValueColor, fontWeight: 700, lineHeight: 1.2, textAlign: 'left', wordBreak: 'break-word' }}>
              {value}
            </Typography>
          )}
        </Box>
        {icon && (
          <Box
            className="cardcustomup-icon"
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: resolvedIconBgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 2,
              flexShrink: 0,
            }}
          >
            {React.cloneElement(icon, {
              style: { color: resolvedIconColor, fontSize: 28 },
            })}
          </Box>
        )}
      </Box>
      {/* Subtitle veya children */}
      {subtitle && (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: children ? 2 : 0 }} >
          <Typography variant="subtitle2" className="cardcustomup-subtitle" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mt: 1, textAlign: 'left' }}>
            {subtitle}
          </Typography>
          <Typography variant="subtitle2" className="cardcustomup-subtitle" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mt: 1, textAlign: 'left' }}>
            {subtitle}
          </Typography>
        </Box>
      )}
      {children && (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: children ? 2 : 0 }} >
          <Box className="cardcustomup-children" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mt: 1, textAlign: 'left' }}>{children}</Box>
          <Box className="cardcustomup-children" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mt: 1, textAlign: 'left' }}>{children}</Box>
        </Box>
      )}
    </Card>
  );
};

CardCustomUp.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtitle: PropTypes.string,
  iconColor: PropTypes.string,
  iconBgColor: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default React.memo(CardCustomUp);