import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Typography, Box } from '@mui/material';
import CardCustom from '../../components/ui/CardCustom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CategoryIcon from '@mui/icons-material/Category';
import PieChart from '../../components/ui/PieChart';
import GenericDropdown from '../../components/ui/GenericDropdown';
import GenericDatePicker from '../../components/ui/GenericDatePicker';
import './style.css';

const summaryCards = [
  {
    icon: <AccountBalanceIcon />,
    label: 'Balance',
    value: '₺223,000,000',
    iconColor: '#3b82f6',
    variant: 'gradient',
    ariaLabel: 'Total Balance Summary',
  },
  {
    icon: <TrendingUpIcon />,
    label: 'Income',
    value: '₺120,000,000',
    iconColor: '#10b981',
    variant: 'gradient',
    ariaLabel: 'Total Income Summary',
  },
  {
    icon: <TrendingDownIcon />,
    label: 'Expense',
    value: '₺10,000',
    iconColor: '#ef4444',
    variant: 'gradient',
    ariaLabel: 'Total Expense Summary',
  },
  {
    icon: <CategoryIcon />,
    label: 'Categories',
    value: '120',
    iconColor: '#f59e0b',
    variant: 'gradient',
    ariaLabel: 'Total Category',
  },
];

const pieChartData = [
  { name: 'Housing', value: 4000, color: '#8c57ff' },
  { name: 'Food', value: 3000, color: '#b08eff' },
  { name: 'Transport', value: 2000, color: '#bba2f5' },
  { name: 'Entertainment', value: 1000, color: '#c0aded' },
  { name: 'Health', value: 800, color: '#d4c5f9' },
  { name: 'Utilities', value: 1200, color: '#f59e0b' },
  { name: 'Shopping', value: 1500, color: '#3b82f6' },

];

const dateTypes = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Annualy', value: 'annualy' },
  { label: 'Period', value: 'period' },
  { label: 'List Trend', value: 'list_trend' },
];

const getIconBgColor = (label) => {
  switch (label) {
    case 'Balance':
      return '#e0f2fe'; // mavi
    case 'Income':
      return '#dcfce7'; // yeşil
    case 'Expense':
      return '#fee2e2'; // kırmızı
    case 'Categories':
      return '#fef9c3'; // sarı
    default:
      return '#e0e7ef';
  }
};

const Dashboard = () => {
  // Current date için helper
  const getCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // Bu ayın ilk günü
  };

  // State tanımları - default değerlerle
  const [expensesDateType, setExpensesDateType] = React.useState('monthly');
  const [expensesDateValue, setExpensesDateValue] = React.useState(getCurrentMonth());
  const [incomeDateType, setIncomeDateType] = React.useState('monthly');
  const [incomeDateValue, setIncomeDateValue] = React.useState(getCurrentMonth());
  const [pieData] = React.useState(pieChartData);

  return (
    <MainLayout>
        {/* Modern Summary Cards */}
        {summaryCards.map((card, idx) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.label}>
            <CardCustom
              icon={card.icon}
              iconBgColor={getIconBgColor(card.label)}
              iconColor={card.iconColor}
              title={card.label}
              value={card.value}
              valueColor={card.iconColor}
            />
          </Grid>
        ))}
        {/* Expenses Analytics PieChart Card */}
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <CardCustom
            title="Expenses Analytics"
            variant="gradient"
            className="dashboard-expenses-analytics-card"
          >
            {/* Header with Title and Controls */}
            <Box className="dashboard-expenses-filter-bar">
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <GenericDropdown
                    id="dashboard-expenses-type-dropdown"
                    className="dashboard-expenses-dropdown"
                    label="Date Type"
                    value={expensesDateType}
                    onChange={e => setExpensesDateType(e.target.value)}
                    options={dateTypes}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 8 }}>
                  {expensesDateType === 'monthly' && (
                    <GenericDatePicker
                      id="dashboard-expenses-date-month"
                      type="month"
                      value={expensesDateValue}
                      onChange={setExpensesDateValue}
                      label="Select Month"
                    />
                  )}
                  {expensesDateType === 'annualy' && (
                    <GenericDatePicker
                      id="dashboard-expenses-date-year"
                      type="year"
                      value={expensesDateValue}
                      onChange={setExpensesDateValue}
                      label="Select Year"
                    />
                  )}
                  {expensesDateType === 'period' && (
                    <Grid container spacing={1}>
                      <Grid size={6}>
                        <GenericDatePicker
                          id="dashboard-expenses-date-period-start"
                          type="date"
                          value={expensesDateValue?.startDate}
                          onChange={val => setExpensesDateValue(prev => ({ ...prev, startDate: val }))}
                          label="Start Date"
                          maxDate={expensesDateValue?.endDate || undefined}
                        />
                      </Grid>
                      <Grid size={6}>
                        <GenericDatePicker
                          id="dashboard-expenses-date-period-end"
                          type="date"
                          value={expensesDateValue?.endDate}
                          onChange={val => setExpensesDateValue(prev => ({ ...prev, endDate: val }))}
                          label="End Date"
                          minDate={expensesDateValue?.startDate || undefined}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>

            {/* PieChart with Modern Styling */}
            <Box >
              <PieChart
                data={pieData}
                height={{ xs: 250, md: '300' }}
                width="100%"
                title=""
              />
            </Box>
          </CardCustom>
        </Grid>
         {/* Income Analytics PieChart Card */}
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <CardCustom
            title="Income Analytics"
            variant="gradient"
            className="dashboard-income-analytics-card"
          >
            {/* Header with Title and Controls */}
            <Box className="dashboard-income-filter-bar">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                  <GenericDropdown
                    id="dashboard-income-type-dropdown"
                    label="Date Type"
                    value={incomeDateType}
                    onChange={e => setIncomeDateType(e.target.value)}
                    options={dateTypes}
                    sx={{ width: '100%!important' }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 8 }}>
                  {incomeDateType === 'monthly' && (
                    <GenericDatePicker
                      id="dashboard-income-date-month"
                      type="month"
                      value={incomeDateValue}
                      onChange={setIncomeDateValue}
                      label="Select Month"
                    />
                  )}
                  {incomeDateType === 'annualy' && (
                    <GenericDatePicker
                      id="dashboard-income-date-year"
                      type="year"
                      value={incomeDateValue}
                      onChange={setIncomeDateValue}
                      label="Select Year"
                    />
                  )}
                  {incomeDateType === 'period' && (
                    <Grid container spacing={1}>
                      <Grid size={6}>
                        <GenericDatePicker
                          id="dashboard-income-date-period-start"
                          type="date"
                          value={incomeDateValue?.startDate || null}
                          onChange={val => setIncomeDateValue(prev => ({ ...prev, startDate: val }))}
                          label="Start Date"
                          maxDate={incomeDateValue?.endDate || undefined}
                        />
                      </Grid>
                      <Grid size={6}>
                        <GenericDatePicker
                          id="dashboard-income-date-period-end"
                          type="date"
                          value={incomeDateValue?.endDate || null}
                          onChange={val => setIncomeDateValue(prev => ({ ...prev, endDate: val }))}
                          label="End Date"
                          minDate={incomeDateValue?.startDate || undefined}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>

            {/* PieChart with Modern Styling */}
            <Box >
              <PieChart
                data={pieData}
                height={{ xs: 250, md: 300 }}
                width="100%"
                title=""
              />
            </Box>
          </CardCustom>
        </Grid>
        {/* Revenue Overview Card */}
        <Grid size={{ xs: 12, sm: 3, lg: 3 }}>
          <CardCustom
            title="Revenue Overview"
            variant="gradient"
            sx={{
              width: '100%',
              height: '100%',
            }}
            contentSx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 500,
            }}>
              Chart Coming Soon...
            </Box>
          </CardCustom>
        </Grid>
        {/* Income Stats */}
        <Grid size={{ xs: 12, sm: 3, lg: 3 }}>
          <CardCustom
            title="Income Stats"
            variant="gradient"
            sx={{
              width: '100%',
              height: '100%',
              minHeight: { xs: 300, md: 480 },
            }}
            contentSx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 500,
            }}>
              Income stats coming soon...
            </Box>
          </CardCustom>
        </Grid>
        {/* Additional Cards with Modern Layout */}
        <Grid size={{ xs: 12, sm: 3, lg: 3 }}>
          <CardCustom
            title="Quick Stats"
            variant="gradient"
            sx={{ width: '100%', height: '100%', minHeight: 180 }}
          >
            <Box sx={{ textAlign: 'left', color: 'text.secondary', fontSize: '0.875rem' }}>
              Statistics panel
            </Box>
          </CardCustom>
        </Grid>
        {/* Recent Activity */}
        <Grid  size={{ xs: 12, sm: 3, lg: 3 }}>
          <CardCustom
            title="Recent Activity"
            variant="gradient"
            sx={{ width: '100%', height: '100%', minHeight: 180 }}
          >
            <Box sx={{ textAlign: 'left', color: 'text.secondary', fontSize: '0.875rem' }}>
              Activity feed
            </Box>
          </CardCustom>
        </Grid>
        {/* Reports */}
        <Grid size={{ xs: 12, sm: 3, lg: 3 }}>
          <CardCustom
            title="Reports"
            variant="gradient"
            sx={{ width: '100%', height: '100%', minHeight: 180 }}
          >
            <Box sx={{ textAlign: 'left', color: 'text.secondary', fontSize: '0.875rem' }}>
              Report summary
            </Box>
          </CardCustom>
        </Grid>
    </MainLayout>
  );
};

export default Dashboard;
