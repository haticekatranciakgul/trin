import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import CardCustom from '../../components/ui/CardCustom';
import { Grid, Box } from '@mui/material';
import PieChart from '../../components/ui/PieChart';
import BarChart from '../../components/ui/BarChart';
import LineChart from '../../components/ui/LineChart';
import GenericDropdown from '../../components/ui/GenericDropdown';
import GenericDatePicker from '../../components/ui/GenericDatePicker';
import './style.css';

// Dashboard ile uyumlu renkler
const INCOME_COLOR = '#10b981';
const EXPENSE_COLOR = '#ef4444';
const PIE_COLORS = ['#8c57ff', '#b08eff', '#bba2f5', '#c0aded', '#f59e0b', '#3b82f6'];
const LINE_COLOR = '#3b82f6';

const dateTypes = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Annualy', value: 'annualy' },
  { label: 'Period', value: 'period' },
];

// Örnek veriler
const barData = [
  { month: 'Jan', income: 3000, expense: 1500 },
  { month: 'Feb', income: 4000, expense: 2200 },
  { month: 'Mar', income: 3300, expense: 2300 },
  { month: 'Apr', income: 4200, expense: 2000 },
  { month: 'May', income: 4800, expense: 2100 },
  { month: 'Jun', income: 5200, expense: 2500 },
];
const pieData = [
  { name: 'Housing', value: 6000 },
  { name: 'Food', value: 3000 },
  { name: 'Transportation', value: 2000 },
  { name: 'Entertainment', value: 1000 },
  { name: 'Utilities', value: 800 },
  { name: 'Shopping', value: 500 },
];
const lineData = [
  { month: 'Jan', net: 1200 },
  { month: 'Feb', net: 1800 },
  { month: 'Mar', net: 1000 },
  { month: 'Apr', net: 2200 },
  { month: 'May', net: 2400 },
  { month: 'Jun', net: 2300 },
];

const Stats = () => {
  // Income vs Expenses için filtre state'leri
  const [statsIncomeExpensesType, setStatsIncomeExpensesType] = React.useState(null);
  const [statsIncomeExpensesDate, setStatsIncomeExpensesDate] = React.useState(null);
  // Expense Distribution için filtre state'leri
  const [statsExpenseDistributionType, setStatsExpenseDistributionType] = React.useState(null);
  const [statsExpenseDistributionDate, setStatsExpenseDistributionDate] = React.useState(null);
  // Monthly Trend için filtre state'leri
  const [statsMonthlyTrendType, setStatsMonthlyTrendType] = React.useState(null);
  const [statsMonthlyTrendDate, setStatsMonthlyTrendDate] = React.useState(null);

  return (
    <MainLayout >
      <Grid container  >
         {/* Income vs Expenses */}
        <Grid item size={{ xs: 12, sm: 6, lg: 6 }}>
          <CardCustom
            id="stats-income-expenses-card"
            className="stats-income-expenses-card"
            title="Income vs Expenses"
          >
            {/* Filtre barı */}
            <Box className="stats-income-expenses-filter-bar" >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <GenericDropdown
                    id="stats-income-expenses-type-dropdown"
                    className="stats-income-expenses-dropdown"
                    label="Date Type"
                    value={statsIncomeExpensesType}
                    onChange={e => setStatsIncomeExpensesType(e.target.value)}
                    options={dateTypes}
                  />
                </Grid>
                <Grid item xs={6}>
                  {statsIncomeExpensesType === 'monthly' && (
                    <GenericDatePicker
                      id="stats-income-expenses-date-month"
                      className="stats-income-expenses-date-month"
                      type="month"
                      value={statsIncomeExpensesDate}
                      onChange={setStatsIncomeExpensesDate}
                      label="Select Month"
                    />
                  )}
                  {statsIncomeExpensesType === 'annualy' && (
                    <GenericDatePicker
                      id="stats-income-expenses-date-year"
                      className="stats-income-expenses-date-year"
                      type="year"
                      value={statsIncomeExpensesDate}
                      onChange={setStatsIncomeExpensesDate}
                      label="Select Year"
                    />
                  )}
                  {statsIncomeExpensesType === 'period' && (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <GenericDatePicker
                          id="stats-income-expenses-date-period-start"
                          className="stats-income-expenses-date-period-start"
                          type="date"
                          value={statsIncomeExpensesDate?.startDate || null}
                          onChange={val => setStatsIncomeExpensesDate(prev => ({ ...prev, startDate: val }))}
                          label="Start Date"
                          maxDate={statsIncomeExpensesDate?.endDate || undefined}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <GenericDatePicker
                          id="stats-income-expenses-date-period-end"
                          className="stats-income-expenses-date-period-end"
                          type="date"
                          value={statsIncomeExpensesDate?.endDate || null}
                          onChange={val => setStatsIncomeExpensesDate(prev => ({ ...prev, endDate: val }))}
                          label="End Date"
                          minDate={statsIncomeExpensesDate?.startDate || undefined}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box >
              <BarChart
                data={barData}
                xKey="month"
                yKeys={[
                  { key: 'income', label: 'Income', color: INCOME_COLOR },
                  { key: 'expense', label: 'Expenses', color: EXPENSE_COLOR },
                ]}
                colors={[INCOME_COLOR, EXPENSE_COLOR]}
                height={{ xs: 250, md: 300 }}
                title=""
              />
            </Box>
          </CardCustom>
        </Grid>
        {/* Expense Distribution */}
        <Grid item size={{ xs: 12, sm: 6, lg: 6 }}>
          <CardCustom
            id="stats-expense-distribution-card"
            className="stats-expense-distribution-card"
            title="Expense Distribution"
          >
            {/* Filtre barı */}
            <Box className="stats-expense-distribution-filter-bar" >
              <Grid container spacing={2} >
                <Grid item xs={6}>
                  <GenericDropdown
                    id="stats-expense-distribution-type-dropdown"
                    className="stats-expense-distribution-type-dropdown"
                    label="Date Type"
                    value={statsExpenseDistributionType}
                    onChange={e => setStatsExpenseDistributionType(e.target.value)}
                    options={dateTypes}
                  />
                </Grid>
                <Grid item xs={6}>
                  {statsExpenseDistributionType === 'monthly' && (
                    <GenericDatePicker
                      id="stats-expense-distribution-date-month"
                      className="stats-expense-distribution-date-month"
                      type="month"
                      value={statsExpenseDistributionDate}
                      onChange={setStatsExpenseDistributionDate}
                      label="Select Month"
                    />
                  )}
                  {statsExpenseDistributionType === 'annualy' && (
                    <GenericDatePicker
                      id="stats-expense-distribution-date-year"
                      className="stats-expense-distribution-date-year"
                      type="year"
                      value={statsExpenseDistributionDate}
                      onChange={setStatsExpenseDistributionDate}
                      label="Select Year"
                    />
                  )}
                  {statsExpenseDistributionType === 'period' && (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <GenericDatePicker
                          id="stats-expense-distribution-date-period-start"
                          className="stats-expense-distribution-date-period-start"
                          type="date"
                          value={statsExpenseDistributionDate?.startDate || null}
                          onChange={val => setStatsExpenseDistributionDate(prev => ({ ...prev, startDate: val }))}
                          label="Start Date"
                          maxDate={statsExpenseDistributionDate?.endDate || undefined}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <GenericDatePicker
                          id="stats-expense-distribution-date-period-end"
                          className="stats-expense-distribution-date-period-end"
                          type="date"
                          value={statsExpenseDistributionDate?.endDate || null}
                          onChange={val => setStatsExpenseDistributionDate(prev => ({ ...prev, endDate: val }))}
                          label="End Date"
                          minDate={statsExpenseDistributionDate?.startDate || undefined}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box >
              <PieChart
                data={pieData}
                colors={PIE_COLORS}
                height={{ xs: 250, md: 300 }}
                title=""
              />
            </Box>
          </CardCustom>
        </Grid>
        {/* Monthly Trend */}
        <Grid item size={{ xs: 12, sm: 12, lg: 12 }}>
          <CardCustom
            id="stats-monthly-trend-card"
            className="stats-monthly-trend-card"
            title="Monthly Trend"
          >
            {/* Filtre barı */}
            <Box className="stats-monthly-trend-filter-bar" >
              <Grid container spacing={2} >
                <Grid item xs={6}>
                  <GenericDropdown
                    id="stats-monthly-trend-type-dropdown"
                    className="stats-monthly-trend-type-dropdown"
                    label="Date Type"
                    value={statsMonthlyTrendType}
                    onChange={e => setStatsMonthlyTrendType(e.target.value)}
                    options={dateTypes}
                  />
                </Grid>
                <Grid item xs={6}>
                  {statsMonthlyTrendType === 'monthly' && (
                    <GenericDatePicker
                      id="stats-monthly-trend-date-month"
                      className="stats-monthly-trend-date-month"
                      type="month"
                      value={statsMonthlyTrendDate}
                      onChange={setStatsMonthlyTrendDate}
                      label="Select Month"
                    />
                  )}
                  {statsMonthlyTrendType === 'annualy' && (
                    <GenericDatePicker
                      id="stats-monthly-trend-date-year"
                      className="stats-monthly-trend-date-year"
                      type="year"
                      value={statsMonthlyTrendDate}
                      onChange={setStatsMonthlyTrendDate}
                      label="Select Year"
                    />
                  )}
                  {statsMonthlyTrendType === 'period' && (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <GenericDatePicker
                          id="stats-monthly-trend-date-period-start"
                          className="stats-monthly-trend-date-period-start"
                          type="date"
                          value={statsMonthlyTrendDate?.startDate || null}
                          onChange={val => setStatsMonthlyTrendDate(prev => ({ ...prev, startDate: val }))}
                          label="Start Date"
                          maxDate={statsMonthlyTrendDate?.endDate || undefined}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <GenericDatePicker
                          id="stats-monthly-trend-date-period-end"
                          className="stats-monthly-trend-date-period-end"
                          type="date"
                          value={statsMonthlyTrendDate?.endDate || null}
                          onChange={val => setStatsMonthlyTrendDate(prev => ({ ...prev, endDate: val }))}
                          label="End Date"
                          minDate={statsMonthlyTrendDate?.startDate || undefined}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box >
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

export default Stats;
