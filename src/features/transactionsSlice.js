import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from '../services/transactionService';

// Async Thunk for fetching user accounts
export const fetchUserAccounts = createAsyncThunk(
  'transactions/fetchUserAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionService.getUserAccounts();
      return response.data || []; // Return accounts array
    } catch (error) {
      console.error('❌ Fetch user accounts failed:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch accounts');
    }
  }
);

// Async Thunk for creating transaction
export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await transactionService.createTransaction(transactionData);
      return response.data; // Return created transaction
    } catch (error) {
      console.error('❌ Create transaction failed:', error);
      return rejectWithValue(error.response?.data || 'Failed to create transaction');
    }
  }
);

// Async Thunk for fetching all transactions
export const fetchAllTransactions = createAsyncThunk(
  'transactions/fetchAllTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionService.getAllTransactions();
      return response.data || []; // Return transactions array
    } catch (error) {
      console.error('❌ Fetch transactions failed:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch transactions');
    }
  }
);

// Category icon mapping helper - returns icon name instead of React element
const getCategoryIconName = (category) => {
  const iconMap = {
    food: 'RestaurantIcon',
    transportation: 'DirectionsCarIcon',
    housing: 'HomeIcon',
    entertainment: 'SportsEsportsIcon',
    utilities: 'ElectricalServicesIcon',
  };
  return iconMap[category] || 'AttachMoneyIcon';
};

// Format date helper
const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: '2-digit' 
  });
};

// Initial state - empty transactions array (no dummy data)
const initialState = {
  transactions: [], // User-entered transactions only
  userAccounts: [], // User accounts from API
  accountsLoading: false, // Loading state for accounts
  creatingTransaction: false, // Loading state for creating transaction
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Add new transaction action
    addTransaction: (state, action) => {
      const { type, account, amount, currency, category, date, description } = action.payload;
      
      // Generate unique ID
      const newId = Date.now();
      
      // Transform modal data to list format
      const newTransaction = {
        id: newId,
        type: type,
        icon: getCategoryIconName(category),
        iconColor: type === 'income' ? 'success' : 'error',
        title: category.charAt(0).toUpperCase() + category.slice(1), // Modal category → List title
        subtitle: description || 'No description', // Modal description → List subtitle
        account: account, // Modal account → List account
        amount: type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)), // Modal amount → List details/amount
        currency: currency || 'USD', // Store currency
        date: formatDate(date), // Modal date → List details/date
        description: description || 'No description',
        note: description || 'No description', // Keep for backward compatibility with existing UI
      };
      
      // Add to beginning of array (newest first)
      state.transactions.unshift(newTransaction);
    },
    
    // Update existing transaction
    updateTransaction: (state, action) => {
      const { id, type, account, amount, currency, category, date, description } = action.payload;
      const index = state.transactions.findIndex(tx => tx.id === id);
      if (index !== -1) {
        // Transform updated data similar to addTransaction
        const updatedTransaction = {
          ...state.transactions[index],
          type: type,
          icon: getCategoryIconName(category),
          iconColor: type === 'income' ? 'success' : 'error',
          title: category.charAt(0).toUpperCase() + category.slice(1),
          subtitle: description || 'No description',
          account: account,
          amount: type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
          currency: currency || 'USD', // Update currency
          date: formatDate(date),
          description: description || 'No description',
          note: description || 'No description', // Keep for backward compatibility
        };
        state.transactions[index] = updatedTransaction;
      }
    },
    
    // Delete transaction
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(tx => tx.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAccounts.pending, (state) => {
        state.accountsLoading = true;
        state.error = null;
      })
      .addCase(fetchUserAccounts.fulfilled, (state, action) => {
        state.accountsLoading = false;
        state.userAccounts = action.payload;
        state.error = null;
      })
      .addCase(fetchUserAccounts.rejected, (state, action) => {
        state.accountsLoading = false;
        state.error = action.payload || 'Failed to fetch accounts';
      })
      .addCase(createTransaction.pending, (state) => {
        state.creatingTransaction = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.creatingTransaction = false;
        state.error = null;
        // Add created transaction to list (transform API response to list format)
        const apiTransaction = action.payload;
        const newTransaction = {
          id: Date.now(), // Temporary ID
          type: apiTransaction.transactionType.toLowerCase(),
          icon: getCategoryIconName(apiTransaction.transactionSubType.toLowerCase()),
          iconColor: apiTransaction.transactionType === 'INCOME' ? 'success' : 'error',
          title: apiTransaction.transactionSubType.charAt(0) + apiTransaction.transactionSubType.slice(1).toLowerCase(),
          subtitle: apiTransaction.description,
          account: apiTransaction.account?.name || 'Unknown',
          amount: apiTransaction.transactionType === 'EXPENSE' ? -Math.abs(apiTransaction.amount) : Math.abs(apiTransaction.amount),
          currency: apiTransaction.currency,
          date: formatDate(apiTransaction.date),
          description: apiTransaction.description,
          note: apiTransaction.description,
        };
        state.transactions.unshift(newTransaction);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.creatingTransaction = false;
        state.error = action.payload || 'Failed to create transaction';
      })
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Transform API transactions to UI format
        state.transactions = (action.payload || []).map((apiTransaction) => ({
          id: apiTransaction.id || Date.now(),
          type: apiTransaction.transactionType?.toLowerCase() || 'expense',
          icon: getCategoryIconName(apiTransaction.transactionSubType?.toLowerCase() || 'other'),
          iconColor: apiTransaction.transactionType === 'INCOME' ? 'success' : 'error',
          title: apiTransaction.transactionSubType ? 
            apiTransaction.transactionSubType.charAt(0) + apiTransaction.transactionSubType.slice(1).toLowerCase() : 
            'Transaction',
          subtitle: apiTransaction.description || 'No description',
          account: apiTransaction.account?.name || 'Unknown',
          amount: apiTransaction.transactionType === 'EXPENSE' ? 
            -Math.abs(apiTransaction.amount) : 
            Math.abs(apiTransaction.amount),
          currency: apiTransaction.currency || 'USD',
          date: formatDate(apiTransaction.date) || 'Unknown date',
          description: apiTransaction.description || 'No description',
          note: apiTransaction.description || 'No note',
        }));
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch transactions';
      });
  },
});

// Export actions
export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;

// Export selectors
export const selectTransactions = (state) => state.transactions.transactions;
export const selectTransactionsLoading = (state) => state.transactions.loading;
export const selectTransactionsError = (state) => state.transactions.error;
export const selectUserAccounts = (state) => state.transactions.userAccounts;
export const selectAccountsLoading = (state) => state.transactions.accountsLoading;
export const selectCreatingTransaction = (state) => state.transactions.creatingTransaction;

// Export reducer
export default transactionsSlice.reducer;
