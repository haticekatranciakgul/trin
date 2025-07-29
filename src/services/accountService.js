import axios from 'axios';

const accountService = {
  createAccount: async (accountData) => {
    const response = await axios.post('https://darbetigh-fintech-budget-fa52f728dbb5.herokuapp.com/api/v1/accounts', {
      name: accountData.name,
      type: accountData.type,
      balance: parseFloat(accountData.balance),
      currency: accountData.currency,
      description: accountData.description
    });
    return response.data;
  },

  getAllAccounts: async () => {
    const response = await axios.get('https://darbetigh-fintech-budget-fa52f728dbb5.herokuapp.com/api/v1/accounts');
    return response.data;
  }
};

export default accountService;
