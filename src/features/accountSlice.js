import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountService from '../services/accountService';

// Async Thunk for creating account
export const createAccount = createAsyncThunk(
  'account/createAccount',
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await accountService.createAccount(accountData);
      return response;
    } catch (error) {
      console.error('❌ Account creation thunk failed:', error);
      return rejectWithValue(error.response?.data || 'Account creation failed');
    }
  }
);

// Async Thunk for fetching all accounts
export const fetchAllAccounts = createAsyncThunk(
  'account/fetchAllAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountService.getAllAccounts();
      return response.data; // Return accounts array
    } catch (error) {
      console.error('❌ Fetch all accounts failed:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch all accounts');
    }
  }
);

const initialState = {
  loading: false,    // Account oluşturma durumu
  error: null,       // Hata mesajları
  success: false,    // Başarılı oluşturma durumu
  accounts: [],      // All accounts array
  accountsLoading: false // Loading state for accounts list
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAccountState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Account creation failed';
      })
      .addCase(fetchAllAccounts.pending, (state) => {
        state.accountsLoading = true;
        state.error = null;
      })
      .addCase(fetchAllAccounts.fulfilled, (state, action) => {
        state.accountsLoading = false;
        state.accounts = action.payload;
        state.error = null;
      })
      .addCase(fetchAllAccounts.rejected, (state, action) => {
        state.accountsLoading = false;
        state.error = action.payload || 'Failed to fetch accounts';
      });
  },
});

export const { clearAccountState } = accountSlice.actions;

// Selectors
export const selectAccountLoading = (state) => state.account.loading;
export const selectAccountError = (state) => state.account.error;
export const selectAccountSuccess = (state) => state.account.success;
export const selectAllAccounts = (state) => state.account.accounts;
export const selectAccountsLoading = (state) => state.account.accountsLoading;

export default accountSlice.reducer;
