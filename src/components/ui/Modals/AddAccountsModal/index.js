import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, clearAccountState, selectAccountLoading, selectAccountError, selectAccountSuccess } from '../../../../features/accountSlice';
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

const accountTypes = [
  { value: 'select a account type', label: 'Select a account type' },
  { value: 'cash', label: 'Cash' },
  { value: 'checkingaccount', label: 'Checking Account' },
  { value: 'savingsaccount', label: 'Savings Account' },
  { value: 'creditcard', label: 'Credit Card' },
  { value: 'investmentaccount', label: 'Investment Account' },
  { value: 'loan', label: 'Loan' }
];

const AddAccountsModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAccountLoading);
  const error = useSelector(selectAccountError);
  const success = useSelector(selectAccountSuccess);

  const [initialBalance, setInitialBalance] = React.useState('');
  const [currency, setCurrency] = React.useState('TRY'); // Currency state added
  const [accountName, setAccountName] = React.useState('');
  const [type, setType] = React.useState('');
  const [date, setDate] = React.useState(null);
  const [description, setDescription] = React.useState('');

  const handleClose = React.useCallback(() => {
    // Redux state'ini temizle
    dispatch(clearAccountState());
    
    // Form state'ini temizle
    setType('');
    setInitialBalance('');
    setCurrency('TRY'); // Reset currency
    setAccountName('');
    setDate(null);
    setDescription('');
    onClose();
  }, [dispatch, onClose]);

  // Success durumunu dinle ve modal'ı kapat
  React.useEffect(() => {
    if (success) {
      console.log('✅ Account created successfully via Redux');
      handleClose();
    }
  }, [success, handleClose]);

  const handleSave = async () => {
    // Redux thunk ile account oluştur
    dispatch(createAccount({
      name: accountName,
      type: type,
      balance: initialBalance,
      currency: currency,
      description: description
    }));
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="xs" 
      fullWidth 
      classes={{ paper: 'add-account-modal-paper' }}
      PaperProps={{
        elevation: 8 // Elevation'ı düşük bir değere ayarla
      }}
    >
      <DialogTitle className="add-account-modal-title">Add New Account</DialogTitle>
      <Divider />
      <DialogContent className="add-account-modal-content">
        {/* Error Message */}
        {error && (
          <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px' }}>
            ❌ {typeof error === 'string' ? error : 'Account creation failed'}
          </div>
        )}
       
        <GenericTextInput
          className="add-account-name-input"
          label="Account Name"
          value={accountName}
          onChange={e => setAccountName(e.target.value)}
          placeholder="Account Name"
          inputProps={{ min: 0, step: 0.01 }}
        />
        <GenericDropdown
          className="add-account-type-select"
          label="Account Type"
          value={type}
          onChange={e => setType(e.target.value)}
          options={accountTypes.map(opt => ({ value: opt.value, label: opt.label }))}

        />
        {/* Balance and Currency Row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <GenericTextInput
            className="add-transaction-amount-input"
            label="Initial Balance"
            type="number"
            value={initialBalance}
            onChange={e => setInitialBalance(e.target.value)}
            placeholder="Initial Balance"
            inputProps={{ min: 0, step: 0.01 }}
          />
          <GenericTextInput
            className="add-account-currency-input"
            label="Currency"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            placeholder="TRY"
          />
        </div>
        <GenericDatePicker
          className="add-account-date-picker"
          label="Date"
          value={date}
          onChange={setDate}
          inputFormat="dd.MM.yyyy"
        />
        <GenericTextarea
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Optional description"
          minRows={2}
        />
      </DialogContent>
      <Divider />
      <DialogActions className="add-account-modal-actions">
        <TypeButton
          type="cancel"
          label="Cancel"
          size="small"
          onClick={handleClose}
          className="add-account-cancel-btn"
        />
        <TypeButton
          type="save"
          label={loading ? "Creating..." : "Save Account"}
          size="small"
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          className="add-account-save-btn"
        />
      </DialogActions>
    </Dialog>
  );
};

AddAccountsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddAccountsModal; 