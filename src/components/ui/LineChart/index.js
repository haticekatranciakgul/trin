import React from 'react';
import PropTypes from 'prop-types';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';

/**
 * Modern LineChart component with MUI X Charts
 */
const LineChart = React.memo(function LineChart({
  data = [],
  width = '100%',
  height = 280,
  colors = [],
  title = '',
  chartProps = {},
  xKey = 'name',
  yKeys = [], // ör: [{ key: 'net', label: 'Net Balance', color: '#3b82f6' }]
}) {
  const defaultColors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b'];

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
        <MuiLineChart
          xAxis={[{ dataKey: xKey, scaleType: 'point', label: '' }]}
          series={yKeys.map((y, idx) => ({
            dataKey: y.key,
            label: y.label,
            color: y.color || colors[idx] || defaultColors[idx % defaultColors.length],
            showMark: true,
            area: true,
            curve: 'monotoneX',
            strokeWidth: 3,
          }))}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: 0,
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              markGap: 8,
              itemGap: 16,
              labelStyle: {
                fontSize: '0.875rem',
                fontWeight: 500,
              },
            },
          }}
          dataset={data}
          height={typeof height === 'number' ? height : 280}
          width={typeof width === 'number' ? width : undefined}
          {...chartProps}
        />
      </Box>
    </Box>
  );
});

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  chartProps: PropTypes.object,
  xKey: PropTypes.string,
  yKeys: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, label: PropTypes.string, color: PropTypes.string })
  ),
};

export default LineChart; 