import React from 'react';
import PropTypes from 'prop-types';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

/**
 * Modern PieChart component with MUI X Charts
 */
const PieChart = React.memo(function PieChart({
  data = [],
  width = '100%',
  height = 280,
  colors = [],
  title = '',
  chartProps = {},
}) {
  const modernColors = [
    '#8c57ff', // Custom Purple 1
    '#b08eff', // Custom Purple 2
    '#bba2f5', // Custom Purple 3
    '#c0aded', // Custom Purple 4
    '#d4c5f9', // Custom Purple 5 (ek renk)
    '#e8dcff', // Custom Purple 6 (ek renk)
    '#9d71ff', // Custom Purple 7 (ek renk)
    '#a384ff', // Custom Purple 8 (ek renk)
  ];

  // MUI X Charts formatına uygun data dönüşümü
  const chartData = data.map((item, index) => ({
    id: index,
    value: item.value,
    label: item.name,
    color: item.color || colors[index] || modernColors[index % modernColors.length],
  }));

  return (
    <Box sx={{ width, height, display: 'flex', flexDirection: 'column', minHeight: 200 }}>
      {title && (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            mb: 1,
            color: 'text.primary',
            fontSize: '1rem',
          }}
        >
          {title}
        </Typography>
      )}
      <Box sx={{ flex: 1, minHeight: 180 }}>
        <MuiPieChart
          series={[
            {
              data: chartData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              outerRadius: 100,
              paddingAngle: 2,
              cornerRadius: 4,
              innerRadius: 70,
            },
          ]}
          height={typeof height === 'number' ? height : 280}
          width={typeof width === 'number' ? width : undefined}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: 0,
            },
          }}
          {...chartProps}
        />
      </Box>
    </Box>
  );
});

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  chartProps: PropTypes.object,
};

export default PieChart;
