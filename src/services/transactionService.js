import axios from 'axios';

const transactionService = {
  getUserAccounts: async () => {
    const response = await axios.get('https://darbetigh-fintech-budget-fa52f728dbb5.herokuapp.com/api/v1/accounts/user');
    return response.data;
  },

  createTransaction: async (transactionData) => {
    const apiData = {
      description: transactionData.description,
      currency: transactionData.currency,
      amount: parseFloat(transactionData.amount),
      transactionType: transactionData.type.toUpperCase(),
      transactionSubType: transactionData.category.toUpperCase(),
      date: transactionData.date.toISOString().split('T')[0],
      accountId: parseInt(transactionData.account)
    };
    const response = await axios.post('https://darbetigh-fintech-budget-fa52f728dbb5.herokuapp.com/api/v1/transactions', apiData);
    return response.data;
  },

  getAllTransactions: async () => {
    const response = await axios.get('https://darbetigh-fintech-budget-fa52f728dbb5.herokuapp.com/api/v1/transactions');
    return response.data;
  }
};

export default transactionService;
