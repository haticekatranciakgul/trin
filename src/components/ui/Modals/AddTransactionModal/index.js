import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction, fetchUserAccounts, createTransaction, selectUserAccounts, selectAccountsLoading, selectCreatingTransaction } from '../../../../features/transactionsSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import './style.css';
import TypeButton from '../../Buttons/TypeButton';
import GenericTextInput from '../../GenericTextInput';
import GenericDropdown from '../../GenericDropdown';
import GenericDatePicker from '../../GenericDatePicker';
import GenericTextarea from '../../GenericTextarea';
import Divider from '@mui/material/Divider';

const categories = [
  { value: 'select a category', label: 'Select a category' },
  { value: 'food', label: 'Food' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'housing', label: 'Housing' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'utilities', label: 'Utilities' },
];

const AddTransactionModal = ({ open, onClose, editingTransaction }) => {
  const dispatch = useDispatch(); // Redux dispatch hook
  const userAccounts = useSelector(selectUserAccounts); // Get user accounts from Redux
  const accountsLoading = useSelector(selectAccountsLoading); // Get loading state
  const creatingTransaction = useSelector(selectCreatingTransaction); // Get creating state
  const isEditMode = !!editingTransaction; // Check if editing existing transaction
  
  // Initialize state with editing data or defaults
  const [type, setType] = React.useState(editingTransaction?.type || 'income');
  const [account, setAccount] = React.useState(editingTransaction?.account || '');
  const [amount, setAmount] = React.useState(editingTransaction ? Math.abs(editingTransaction.amount).toString() : '');
  const [currency, setCurrency] = React.useState(editingTransaction?.currency || 'TRY'); // Currency state
  const [category, setCategory] = React.useState(editingTransaction?.title?.toLowerCase() || '');
  const [date, setDate] = React.useState(editingTransaction ? new Date(editingTransaction.date) : new Date());
  const [description, setDescription] = React.useState(editingTransaction?.description || '');

  // Fetch user accounts when modal opens
  React.useEffect(() => {
    if (open) {
      dispatch(fetchUserAccounts());
    }
  }, [open, dispatch]);

  // Update state when editingTransaction changes
  React.useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type || 'income');
      setAccount(editingTransaction.account || '');
      setAmount(editingTransaction ? Math.abs(editingTransaction.amount).toString() : '');
      setCurrency(editingTransaction.currency || 'USD');
      setCategory(editingTransaction.title?.toLowerCase() || '');
      setDate(editingTransaction.date ? new Date(editingTransaction.date) : new Date());
      setDescription(editingTransaction.description || '');
    } else {
      // Reset for new transaction
      setType('income');
      setAccount('');
      setAmount('');
      setCurrency('USD'); // Default currency
      setCategory('');
      setDate(new Date());
      setDescription('');
    }
  }, [editingTransaction]);

  const handleSave = () => {
    // Validation: Basic form validation
    if (!account || !amount || !category) {
      alert('Please fill all required fields');
      return;
    }
    
    if (isEditMode) {
      // Update existing transaction (keep old local logic for now)
      dispatch(updateTransaction({
        id: editingTransaction.id,
        type, 
        account, 
        amount, 
        currency,
        category, 
        date, 
        description
      }));
    } else {
      // Create new transaction via API
      dispatch(createTransaction({ 
        type, 
        account, 
        amount, 
        currency, 
        category, 
        date, 
        description 
      }));
    }
    
    // Reset form and close modal
    handleClose();
  };

  const handleClose = () => {
    setType('income');
    setAccount('');
    setAmount('');
    setCurrency(''); // Reset currency
    setCategory('');
    setDate(null);
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth classes={{ paper: 'add-transaction-modal-paper' }}>
      <DialogTitle className="add-transaction-modal-title">
        {isEditMode ? 'Edit Transaction' : 'Add New Transaction'}
      </DialogTitle>
      <Divider />
      <DialogContent className="add-transaction-modal-content">
        <div className="add-transaction-type-row">
          <TypeButton
            type="income"
            label="Income"
            active={type === 'income'}
            variant={type === 'income' ? 'outlined' : 'text'} // Seçili ise outlined, değilse text
            onClick={() => setType('income')}
            fullWidth
          />
          <TypeButton
            type="expense"
            label="Expense"
            active={type === 'expense'}
            variant={type === 'expense' ? 'outlined' : 'text'} // Seçili ise outlined, değilse text
            onClick={() => setType('expense')}
            fullWidth
          />
        </div>
        <GenericDropdown
          className="add-transaction-account-select"
          label="Account"
          value={account}
          onChange={e => setAccount(e.target.value)}
          options={[
            { value: '', label: accountsLoading ? 'Loading accounts...' : 'Select an account' },
            ...userAccounts.map(acc => ({ value: acc.id, label: acc.name }))
          ]}
          disabled={accountsLoading}
        />
        {/* Amount and Currency Row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <GenericTextInput
            className="add-transaction-amount-input"
            label="Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Amount"
            inputProps={{ min: 0, step: 0.01 }}
            
          />
          <GenericTextInput
            className="add-transaction-currency-input"
            label="Currency"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            placeholder="USD"
           
          />
        </div>
        <GenericDropdown
          className="add-transaction-category-select"
          label="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          options={categories.map(opt => ({ value: opt.value, label: opt.label }))}

        />
        <GenericDatePicker
          className="add-transaction-date-picker"
          label="Date"
          value={date}
          onChange={setDate}
          inputFormat="dd.MM.yyyy"
        />
        <GenericTextarea
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Transaction description"
          minRows={3} // Increase rows since this is now the main text field
        />
      </DialogContent>
      <Divider />
      <DialogActions className="add-transaction-modal-actions">
        <TypeButton
          type="cancel"
          label="Cancel"
          size="small"
          onClick={handleClose}
          className="add-transaction-cancel-btn"
        />
        <TypeButton
          type="save"
          label={creatingTransaction ? "Creating..." : "Save Transaction"}
          size="small"
          variant="contained"
          onClick={handleSave}
          disabled={creatingTransaction}
          className="add-transaction-save-btn"
        />
      </DialogActions>
    </Dialog>
  );
};

AddTransactionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editingTransaction: PropTypes.object, // Optional - null for new, object for edit
};

export default AddTransactionModal; 