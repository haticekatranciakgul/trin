import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAccounts, selectAllAccounts, selectAccountsLoading } from '../../features/accountSlice';
import MainLayout from '../../layouts/MainLayout';
import { Typography, Box, Grid, Paper, Avatar, Pagination } from '@mui/material';
import TypeButton from '../../components/ui/Buttons/TypeButton';
import AddAccountModal from '../../components/ui/Modals/AddAccountsModal';
import CardCustomUp from '../../components/ui/CardCustomUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import './style.css'



import CardCustom from '../../components/ui/CardCustom';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import './style.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const summaryCards = [
  {
    icon: <AccountBalanceIcon />,
    label: 'Assets',
    value: '₺223,000,000',
    iconColor: '#3b82f6',
    variant: 'gradient',
    ariaLabel: 'Total Balance Summary',
    children: 'Bank Accounts ',
    subtitle:'Cash $2,345.67',
  },
  {
    icon: <TrendingUpIcon />,
    label: 'Liabilities',
    value: '₺120,000,000',
    iconColor: '#10b981',
    variant: 'gradient',
    ariaLabel: 'Total Income Summary',
    children: 'Credit Cards ',
    subtitle:'Loans $2,222.22',

  },
  {
    icon: <TrendingDownIcon />,
    label: 'Net Worth',
    value: '₺10,000',
    iconColor: '#ef4444',
    variant: 'gradient',
    ariaLabel: 'Total Expense Summary',
    children: 'Loans $2,222.22',
    subtitle:'Assets - Liabilities'
  },
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

// Account type to icon mapping
const getAccountIcon = (type) => {
  const iconMap = {
    'cash': <AttachMoneyIcon />,
    'checkingaccount': <AccountBalanceIcon />,
    'savingsaccount': <HomeIcon />, 
    'INCOME': <TrendingUpIcon />,
    'creditcard': <AttachMoneyIcon />,
    'account': <AccountBalanceIcon />, // Default account icon
  };
  return iconMap[type.toLowerCase()] || <AccountBalanceIcon />;
};

const Accounts = () => {

  const theme = useMuiTheme();
  const dispatch = useDispatch();
  
  // Redux state
  const accounts = useSelector(selectAllAccounts);
  const accountsLoading = useSelector(selectAccountsLoading);

  const [addModalOpen, setAddModalOpen] = React.useState(false);

  // Fetch accounts on component mount
  React.useEffect(() => {
    dispatch(fetchAllAccounts());
  }, [dispatch]);

  // Transform API data to UI format (user endpoint - only id and name)
  const transformedAccounts = (accounts || []).map((account, index) => ({
    id: account.id || index + 1,
    type: 'account', // Default type (user endpoint doesn't have type)
    icon: getAccountIcon('account'),
    iconColor: 'success', // Default success (no balance info)
    title: account.name,
    subtitle: 'User Account', // Default subtitle (no description)
    account: 'Account',
    amount: 0, // User endpoint doesn't have balance
    currency: 'TRY', // Default currency
    date: 'Active',
    description: 'User Account'
  }));

  const handleAddAccounts = () => setAddModalOpen(true);
  const handleCloseModal = () => setAddModalOpen(false);
  const handleSubmitAccount = (data) => {
    // Burada hesap ekleme işlemi yapılacak
    console.log('Yeni hesap:', data);
    setAddModalOpen(false);
    // Refresh accounts after creating new one
    dispatch(fetchAllAccounts());
  };

  return (
    <MainLayout>
      <Box
        className="accounts-header-row"
        id="accounts-header-row"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: 1,
        }}
      >
        <Typography
          variant="h4"
          className="accounts-title"
          id="accounts-title"
          sx={{ fontWeight: 600 }}
        >
          Accounts
        </Typography>
        <Box className="add-accounts-btn">
          <TypeButton
            id="add-accounts-btn"
            className="add-accounts-btn"
            type="add"
            label="Add Accounts"
            size="small"
            onClick={handleAddAccounts}
          />
        </Box>
      </Box>
      
      <Grid container spacing={3} className="accounts-list-row" id="accounts-list-row">
        {/* Modern Summary Cards */}
        {summaryCards.map((card, idx) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={card.label}>
            <CardCustomUp
              icon={card.icon}
              iconBgColor={getIconBgColor(card.label)}
              iconColor={card.iconColor}
              title={card.label}
              value={card.value}
              valueColor={card.iconColor}
              children={card.children}
              subtitle={card.subtitle}
            />
          </Grid>
        ))}
      </Grid>


      <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
        <CardCustom
          title="Account Details"
        >
          {/* Üst filtre ve ekle butonu */}
          

          {/* Account List */}
          <Paper variant="outlined" sx={{ p: 0, mb: 2, borderRadius: 2, overflow: 'hidden', background: theme.palette.background.paper  }}>
            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 200, fontWeight: 700, color: theme.palette.text.secondary }}>Account</TableCell>
                    <TableCell sx={{ width: 200, fontWeight: 700, color: theme.palette.text.secondary }} align="right">Details</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accountsLoading ? (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography sx={{ color: theme.palette.text.secondary, py: 3 }}>
                          Loading accounts...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : transformedAccounts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography sx={{ color: theme.palette.text.secondary, py: 3 }}>
                          No accounts found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    transformedAccounts.map((tx) => (
                      <React.Fragment key={tx.id}>
                        <TableRow hover>
                          {/* Category */}
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: theme.palette[tx.iconColor].light, color: theme.palette[tx.iconColor].main, width: 40, height: 40, mr: 2 }}>
                                {tx.icon}
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{tx.title}</Typography>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{tx.subtitle}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          {/* Details */}
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                              <Box>
                                <Typography sx={{ fontWeight: 600, color: tx.amount >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
                                  {tx.amount.toLocaleString('en-US', { style: 'currency', currency: tx.currency })}
                                </Typography>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{tx.date}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination ve toplam gösterimi */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.5, background: theme.palette.background.paper  }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Showing 1 to {transformedAccounts.length} of {transformedAccounts.length} accounts
              </Typography>
              {transformedAccounts.length > 10 && (
                <Pagination count={Math.ceil(transformedAccounts.length / 10)} page={1} color="primary" />
              )}
            </Box>
          </Paper>
        </CardCustom>
      </Grid>




    
      <AddAccountModal
        open={addModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAccount}
      />
    </MainLayout>
  );
};
export default Accounts;