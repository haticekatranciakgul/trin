import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/Categories';
import Transactions from '../pages/Transactions';
import Stats from '../pages/Stats';
import Accounts from '../pages/Accounts';
import More from '../pages/More';
import GoldCharts from '../pages/Charts/GoldCharts';
import { APP_PATHS } from '../constants/routes';

// Ana uygulama rotalarını döndüren fonksiyon
export const getAppRoutes = () => [
  <Route key="dashboard" path={APP_PATHS.DASHBOARD} element={<Dashboard />} />,
  <Route key="transactions" path={APP_PATHS.TRANSACTIONS} element={<Transactions />} />,
  <Route key="stats" path={APP_PATHS.STATS} element={<Stats />} />,
  <Route key="accounts" path={APP_PATHS.ACCOUNTS} element={<Accounts />} />,
  <Route key="categories" path={APP_PATHS.CATEGORIES} element={<Categories />} />,
  <Route key="more" path={APP_PATHS.MORE} element={<More />} />,
  <Route key="gold-charts" path={APP_PATHS.GOLD_CHARTS} element={<GoldCharts />} />
]; 