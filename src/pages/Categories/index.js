import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Grid, Typography, Box } from '@mui/material';
import CardCustomUp from '../../components/ui/CardCustomUp';
import TypeButton from '../../components/ui/Buttons/TypeButton';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SchoolIcon from '@mui/icons-material/School';
import TvIcon from '@mui/icons-material/Tv';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AddCategoryModal from '../../components/ui/Modals/AddCategoryModal';
import './style.css'

// Dashboard ile uyumlu kategori renkleri
const CATEGORY_COLORS = {
  Housing:      { iconColor: '#8c57ff', iconBgColor: '#ede9fe' },
  Food:         { iconColor: '#b08eff', iconBgColor: '#f3e8ff' },
  Transportation:{ iconColor: '#bba2f5', iconBgColor: '#f5f3ff' },
  Entertainment:{ iconColor: '#f59e0b', iconBgColor: '#fef9c3' },
  Health:       { iconColor: '#d4c5f9', iconBgColor: '#f3e8ff' },
  Shopping:     { iconColor: '#3b82f6', iconBgColor: '#e0f2fe' },
  Education:    { iconColor: '#a384ff', iconBgColor: '#ede9fe' },
  Utilities:    { iconColor: '#10b981', iconBgColor: '#dcfce7' },
};

const categories = [
  {
    id: 'cat-housing',
    name: 'Housing',
    amount: 1500,
    icon: <HomeIcon />,
  },
  {
    id: 'cat-food',
    name: 'Food',
    amount: 450,
    icon: <RestaurantIcon />,
  },
  {
    id: 'cat-transport',
    name: 'Transportation',
    amount: 120,
    icon: <DirectionsCarIcon />,
  },
  {
    id: 'cat-entertainment',
    name: 'Entertainment',
    amount: 75,
    icon: <TvIcon />,
  },
  {
    id: 'cat-health',
    name: 'Health',
    amount: 85,
    icon: <LocalHospitalIcon />,
  },
  {
    id: 'cat-shopping',
    name: 'Shopping',
    amount: 200,
    icon: <ShoppingBagIcon />,
  },
  {
    id: 'cat-education',
    name: 'Education',
    amount: 150,
    icon: <SchoolIcon />,
  },
  {
    id: 'cat-utilities',
    name: 'Utilities',
    amount: 180,
    icon: <EmojiObjectsIcon />,
  },
];

const Categories = () => {
  const [addModalOpen, setAddModalOpen] = React.useState(false);

  const handleAddCategory = () => setAddModalOpen(true);
  const handleCloseModal = () => setAddModalOpen(false);
  const handleSubmitCategory = (data) => {
    // Burada kategori ekleme işlemi yapılacak
    console.log('Yeni kategori:', data);
    setAddModalOpen(false);
  };

  return (
    <MainLayout>
      <Box
        className="categories-header-row"
        id="categories-header-row"
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
          className="categories-title"
          id="categories-title"
          sx={{ fontWeight: 600 }}
        >
          Categories
        </Typography>
        <Box className="add-category-btn">
          <TypeButton
            id="add-category-btn"
            className="add-category-btn"
            type="add"
            label="Add Category"
            size="small"
            onClick={handleAddCategory}
          />
        </Box>
      </Box>
      <Grid container spacing={3} className="categories-list-row" id="categories-list-row">
        {categories.map((cat) => {
          const colorSet = CATEGORY_COLORS[cat.name] || { iconColor: '#3b82f6', iconBgColor: '#e0f2fe' };
          return (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={cat.id}>
              <CardCustomUp
                id={cat.id}
                className="category-card"
                label={cat.name}
                title={cat.name}
                value={`$${cat.amount.toLocaleString()}`}
                icon={cat.icon}
                iconColor={colorSet.iconColor}
                iconBgColor={colorSet.iconBgColor}
              />
            </Grid>
          );
        })}
      </Grid>
      <AddCategoryModal
        open={addModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCategory}
      />
    </MainLayout>
  );
};

export default Categories;
