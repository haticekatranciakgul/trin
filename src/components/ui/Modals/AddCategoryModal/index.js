import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import TypeButton from '../../Buttons/TypeButton';
import GenericTextInput from '../../GenericTextInput';
import './style.css';
// İkonlar
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TvIcon from '@mui/icons-material/Tv';
import SchoolIcon from '@mui/icons-material/School';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FlightIcon from '@mui/icons-material/Flight';

const ICON_OPTIONS = [
  { value: 'home', icon: <HomeIcon /> },
  { value: 'food', icon: <RestaurantIcon /> },
  { value: 'car', icon: <DirectionsCarIcon /> },
  { value: 'shopping', icon: <ShoppingBagIcon /> },
  { value: 'health', icon: <LocalHospitalIcon /> },
  { value: 'tv', icon: <TvIcon /> },
  { value: 'school', icon: <SchoolIcon /> },
  { value: 'utilities', icon: <EmojiObjectsIcon /> },
  { value: 'flight', icon: <FlightIcon /> },
  { value: 'gift', icon: <CardGiftcardIcon /> },
];

const COLOR_OPTIONS = [
  '#3b82f6', // mavi
  '#ef4444', // kırmızı
  '#10b981', // yeşil
  '#f59e0b', // sarı
  '#a384ff', // mor
  '#f472b6', // pembe
  '#6366f1', // koyu mor
];

const AddCategoryModal = ({ open, onClose, onSubmit }) => {
  const [categoryName, setCategoryName] = React.useState('');
  const [categoryType, setCategoryType] = React.useState('income');
  const [selectedIcon, setSelectedIcon] = React.useState('home');
  const [selectedColor, setSelectedColor] = React.useState(COLOR_OPTIONS[0]);

  const handleSave = () => {
    onSubmit({ categoryName, categoryType, selectedIcon, selectedColor });
  };

  const handleClose = () => {
    setCategoryName('');
    setCategoryType('income');
    setSelectedIcon('home');
    setSelectedColor(COLOR_OPTIONS[0]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth classes={{ paper: 'add-category-modal-paper' }}>
      <DialogTitle className="add-category-modal-title">Add New Category</DialogTitle>
      <Divider />
      <DialogContent className="add-category-modal-content">
      <div className="add-category-type-row">
          <TypeButton
            type="income"
            label="Income"
            active={categoryType === 'income'}
            onClick={() => setCategoryType('income')}
            fullWidth
          />
          <TypeButton
            type="expense"
            label="Expense"
            active={categoryType === 'expense'}
            onClick={() => setCategoryType('expense')}
            fullWidth
          />
        </div>
        <GenericTextInput
          className="add-category-name-input"
          label="Category Name"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          placeholder="e.g. Groceries"
        />
       
        <div className="add-category-icon-row">
          {ICON_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`add-category-icon-btn${selectedIcon === opt.value ? ' selected' : ''}`}
              onClick={() => setSelectedIcon(opt.value)}
              aria-label={opt.value}
            >
              {opt.icon}
            </button>
          ))}
        </div>
        <div className="add-category-color-row">
          {COLOR_OPTIONS.map(color => (
            <button
              key={color}
              type="button"
              className={`add-category-color-btn${selectedColor === color ? ' selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              aria-label={color}
            />
          ))}
        </div>
      </DialogContent>
      <Divider />
      <DialogActions className="add-category-modal-actions">
        <TypeButton
          type="cancel"
          label="Cancel"
          size="small"
          onClick={handleClose}
          className="add-category-cancel-btn"
        />
        <TypeButton
          type="save"
          label="Save Category"
          size="small"
          variant="contained"
          onClick={handleSave}
          className="add-category-save-btn"
        />
      </DialogActions>
    </Dialog>
  );
};

AddCategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddCategoryModal; 