import React from 'react';
import { Container, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const MainLayout = ({ children, maxWidth = 'lg', spacing = 3, sx = {} }) => (
  <Container maxWidth={maxWidth} sx={{ ...sx, backgroundColor: "" }}>
    <Grid container spacing={spacing} >
      {children}
    </Grid>
  </Container>
);

MainLayout.propTypes = {
  children: PropTypes.node,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  spacing: PropTypes.number,
  sx: PropTypes.object,
};

export default MainLayout; 