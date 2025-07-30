import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Typography, Grid, Box } from '@mui/material';
import LineAmChart from '../../components/ui/LineAmChart';
import CardCustom from '../../components/ui/CardCustom';


const LineChartAmChart = () => {
  return (
   <MainLayout>
      <Grid container  direction="column"
      spacing={2}
      alignItems="center"
      sx={{ width: "100%" }}>
     
        <Grid  size={{ xs: 12, sm: 12, lg: 12 }}>
          <CardCustom
            id="goldcharts-card"
            className="goldcharts-card"
            title="Gold Charts"
            sx={{ width: '100%' }}
          >
      
            <Box   sx={{ width: '100%' }}>
              <LineAmChart />
            </Box>
          </CardCustom>
        </Grid>
      </Grid>

    </MainLayout>
  );
};

export default LineChartAmChart;
   