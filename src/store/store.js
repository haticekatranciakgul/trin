import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactionsSlice';
import accountReducer from '../features/accountSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    account: accountReducer,
  },
});

export default store;