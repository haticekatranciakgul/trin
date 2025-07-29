import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTransactions, deleteTransaction, fetchAllTransactions } from '../../features/transactionsSlice';
import { IconButton, Typography, Box, Grid, Paper, Avatar, Pagination } from '@mui/material';
import CardCustom from '../../components/ui/CardCustom';
import MainLayout from '../../layouts/MainLayout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import './style.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddTransactionModal from '../../components/ui/Modals/AddTransactionModal';
import TypeButton from '../../components/ui/Buttons/TypeButton';
import GenericDatePicker from '../../components/ui/GenericDatePicker';
import GenericDropdown from '../../components/ui/GenericDropdown';
import GenericSearch from '../../components/ui/GenericSearch';

const Transactions = () => {

  const theme = useMuiTheme();
  const dispatch = useDispatch(); // Redux dispatch hook
  const transactions = useSelector(selectTransactions); // Get transactions from Redux store

  // Icon mapping function - converts icon names to React elements
  const getIconComponent = (iconName) => {
    const iconMap = {
      'RestaurantIcon': <RestaurantIcon />,
      'DirectionsCarIcon': <DirectionsCarIcon />,
      'HomeIcon': <HomeIcon />,
      'SportsEsportsIcon': <SportsEsportsIcon />,
      'ElectricalServicesIcon': <ElectricalServicesIcon />,
      'AttachMoneyIcon': <AttachMoneyIcon />,
    };
    return iconMap[iconName] || <AttachMoneyIcon />;
  };

  const [filterType, setFilterType] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [date, setDate] = React.useState(null); // veya new Date()
  const [openRow, setOpenRow] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState(null); // Edit mode için transaction data

  // Fetch transactions on component mount
  React.useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  // Handle transaction deletion
  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  // Handle transaction edit - Open modal with transaction data
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  // Handle modal close - Reset edit state
  const handleModalClose = () => {
    setModalOpen(false);
    setEditingTransaction(null);
  };

  // Safe currency formatting function
  const formatCurrency = (amount, currency) => {
    try {
      // ISO currency codes that are supported
      const supportedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'TRY', 'CAD', 'AUD'];
      const safeCurrency = supportedCurrencies.includes(currency?.toUpperCase()) ? currency.toUpperCase() : 'USD';

      return Math.abs(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: safeCurrency
      });
    } catch (error) {
      // Fallback: just show amount with currency symbol
      return `${Math.abs(amount).toFixed(2)} ${currency || 'USD'}`;
    }
  };

  // Remove dummy data - now using Redux state

  return (
    <MainLayout >
      <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
        <CardCustom
          title="Transactions"
        >
          {/* Üst filtre ve ekle butonu */}
          <Grid container marginBottom={2} spacing={1} >
            {/* Sol taraf */}
            <Grid size={{ xs: 12, sm: 4, lg: 6 }} >
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                  <GenericSearch
                    label="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                  <GenericDropdown
                    id="filter-category"
                    label="Category"
                    value={category}
                    width={'100%'}
                    onChange={e => setCategory(e.target.value)}
                    options={[
                      { value: 'entertainment', label: 'Entertainment' },
                      { value: 'food', label: 'Food' },
                      { value: 'housing', label: 'Housing' },
                      { value: 'utilities', label: 'Utilities' },
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Sağ taraf */}
            <Grid size={{ xs: 12, sm: 8, lg: 6 }}>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 3, lg: 3 }}>
                  <GenericDropdown
                    id="filter-type"
                    label="All"
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    options={[
                      { value: 'all', label: 'All' },
                      { value: 'income', label: 'Income' },
                      { value: 'expense', label: 'Expense' },
                    ]}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3, lg: 3 }}>
                  <GenericDatePicker
                    label="Date"
                    value={date}
                    onChange={setDate}
                    inputFormat="dd.MM.yyyy"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                  <TypeButton
                    type="add"
                    label="Add Transaction"
                    size="small"
                    onClick={() => {
                      setEditingTransaction(null); // New transaction - clear edit state
                      setModalOpen(true);
                    }}
                  />

                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Transaction List */}
          <Paper variant="outlined" sx={{ p: 0, mb: 2, borderRadius: 2, overflow: 'hidden', background: theme.palette.background.paper }}>
            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 200, fontWeight: 700, color: theme.palette.text.secondary }}>Category</TableCell>
                    <TableCell sx={{ width: 180, fontWeight: 700, color: theme.palette.text.secondary }}>Account</TableCell>
                    <TableCell sx={{ width: 200, fontWeight: 700, color: theme.palette.text.secondary }} align="right">Details</TableCell>

                    <TableCell sx={{ width: 100, fontWeight: 700, color: theme.palette.text.secondary }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((tx) => (
                    <React.Fragment key={tx.id}>
                      <TableRow hover>
                        {/* Category */}
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: theme.palette[tx.iconColor].light, color: theme.palette[tx.iconColor].main, width: 40, height: 40, mr: 2 }}>
                              {getIconComponent(tx.icon)}
                            </Avatar>
                            <Box>
                              <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{tx.title}</Typography>
                              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{tx.subtitle}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        {/* Account */}
                        <TableCell>
                          <Typography sx={{ color: theme.palette.text.primary }}>{tx.account}</Typography>
                        </TableCell>
                        {/* Details */}
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                            <Box>
                              <Typography sx={{ fontWeight: 600, color: tx.amount > 0 ? theme.palette.success.main : theme.palette.error.main }}>
                                {tx.amount > 0 ? `+` : ``}{formatCurrency(tx.amount, tx.currency)}
                              </Typography>
                              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{tx.date}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        {/* Collapse Button */}

                        {/* Actions */}
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditTransaction(tx)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteTransaction(tx.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => setOpenRow(openRow === tx.id ? null : tx.id)}>
                            {openRow === tx.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                          <Collapse in={openRow === tx.id} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 2, background: theme.palette.background.paper, borderRadius: 2, p: 2 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Description</Typography>
                              <Typography variant="body2">{tx.description}</Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination ve toplam gösterimi */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.5, background: theme.palette.background.paper }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Showing 1 to {transactions.length} of {transactions.length} transactions
              </Typography>
              <Pagination count={Math.ceil(transactions.length / 10)} page={1} color="primary" />
            </Box>
          </Paper>
        </CardCustom>
      </Grid>
      <AddTransactionModal
        open={modalOpen}
        onClose={handleModalClose}
        editingTransaction={editingTransaction} // Pass editing transaction data
      // onSubmit prop removed - Redux handles transaction creation
      />
    </MainLayout>
  );
};

export default Transactions;
