import React, { useLayoutEffect, useRef } from 'react';
import { useTheme } from '../../../theme/ThemeContext';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const dummyData = [
  { date: '2025-07-25', value: 1500, silver: 124 },
  { date: '2025-07-26', value: 1820, silver: 20 },
  { date: '2025-07-27', value: 1210, silver: 123.5 },
  { date: '2025-07-28', value: 1835, silver: 332 },
  { date: '2025-07-29', value: 1850, silver: 27 }
];

const LineAmChart = () => {
  const chartRef = useRef(null);
  const { isDarkMode } = useTheme();


  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout
      })
    );

    let xAxisRenderer = am5xy.AxisRendererX.new(root, {});
    let yAxisRenderer = am5xy.AxisRendererY.new(root, {});

    // Tema moduna göre eksen ve grid renklerini ayarla
    const axisColor = isDarkMode ? '#fff' : '#222';
    const gridColor = isDarkMode ? '#fff' : '#222';
    const gridOpacity = 0.15;

    xAxisRenderer.labels.template.setAll({ fill: am5.color(axisColor) });
    xAxisRenderer.grid.template.setAll({ stroke: am5.color(gridColor), strokeOpacity: gridOpacity });
    xAxisRenderer.ticks.template.setAll({ stroke: am5.color(axisColor) });

    yAxisRenderer.labels.template.setAll({ fill: am5.color(axisColor) });
    yAxisRenderer.grid.template.setAll({ stroke: am5.color(gridColor), strokeOpacity: gridOpacity });
    yAxisRenderer.ticks.template.setAll({ stroke: am5.color(axisColor) });

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: xAxisRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yAxisRenderer
      })
    );


    // Altın serisi
    let goldSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Altın',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, { labelText: '{valueY}' })
      })
    );
    goldSeries.data.setAll(dummyData.map(item => ({
      date: new Date(item.date).getTime(),
      value: item.value
    })));
    goldSeries.appear(1000);

    // Gümüş serisi
    let silverSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Gümüş',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'silver',
        valueXField: 'date',
        stroke: am5.color(0x00bcd4),
        tooltip: am5.Tooltip.new(root, { labelText: '{valueY}' })
      })
    );
    silverSeries.data.setAll(dummyData.map(item => ({
      date: new Date(item.date).getTime(),
      silver: item.silver
    })));
    silverSeries.appear(1000);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineAmChart;
