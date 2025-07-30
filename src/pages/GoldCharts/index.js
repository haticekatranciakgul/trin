import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Box  } from '@mui/material';
import GoldChart from '../../components/ui/GoldChartMui/GoldChart';
import CardCustom from '../../components/ui/CardCustom';
import LineChart from '../../components/ui/LineChart'

const LINE_COLOR = '#3b82f6';
const lineData = [
  { month: 'Jan', net: 1200 },
  { month: 'Feb', net: 1800 },
  { month: 'Mar', net: 1000 },
  { month: 'Apr', net: 2200 },
  { month: 'May', net: 2400 },
  { month: 'Jun', net: 2300 },
];


const GoldCharts = () => {
  
  return (
    <MainLayout>
      <Grid container  direction="column"
      sx={{ width: "100%" }}>
     
        <Grid  size={{ xs: 12, sm: 12, lg: 12 }}>
          <CardCustom
            id="goldcharts-card"
            className="goldcharts-card"
            title="Gold Charts"
            sx={{ width: '100%' }}
          >
      AAAAAAAAA
            <Box   sx={{ width: '100%' }}>
             <GoldChart   sx={{ width: '100%' }}/>
            </Box>
          </CardCustom>
        </Grid>

        <Grid  size={{ xs: 12, sm: 12, lg: 12 }}>
          <CardCustom
            id="goldcharts-card"
            className="goldcharts-card"
            title="Gold Charts"
            sx={{ width: '100%' }}
          >
      
            <Box   sx={{ width: '100%' }}>
              <LineChart
                             data={lineData}
                             xKey="month"
                             yKeys={[
                               { key: 'net', label: 'Net Balance', color: LINE_COLOR },
                             ]}
                             colors={[LINE_COLOR]}
                             height={{ xs: 250, md: 300 }}
                             title=""
                           />
            </Box>
          </CardCustom>
        </Grid>
      </Grid>

    </MainLayout>
  );
};

export default GoldCharts; 