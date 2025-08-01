import * as React from 'react';
import {
    LineChart,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];


const GoldChart = () => {



    return (
        <Box sx={{ width: '100%' }}>
            <LineChart
                height={500}
                series={[
                    { data: pData, label: 'pv', id: 'pvId' },
                    { data: uData, label: 'uv', id: 'uvId' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                yAxis={[{ width: 50 }]}
                sx={{
                    [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
                        strokeWidth: 1,
                    },
                    [`.${lineElementClasses.root}[data-series="pvId"]`]: {
                        strokeDasharray: '5 5',
                    },
                    [`.${lineElementClasses.root}[data-series="uvId"]`]: {
                        strokeDasharray: '3 4 5 2',
                    },
                    [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
                        fill: '#fff',
                    },
                    [`& .${markElementClasses.highlighted}`]: {
                        stroke: 'none',
                    },
                }}
                margin={margin}
            />
        </Box>
    );
};

export default GoldChart;
