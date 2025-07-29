import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ThemeToggle from '../ThemeToggle';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// Rota yollarını constants'tan import et
import { PATHS, APP_PATHS } from '../../../constants/routes';

// navLinks sabitini icon'larla güncelliyoruz
const navLinks = [
  { label: 'Dashboard', path: APP_PATHS.DASHBOARD, icon: <DashboardIcon /> },
  { label: 'Transactions', path: APP_PATHS.TRANSACTIONS, icon: <ReceiptIcon /> },
  { label: 'Stats', path: APP_PATHS.STATS, icon: <BarChartIcon /> },
  { label: 'Accounts', path: APP_PATHS.ACCOUNTS, icon: <AccountBalanceIcon /> },
  { label: 'Categories', path: APP_PATHS.CATEGORIES, icon: <CategoryIcon /> },
  { label: 'Gold Charts', path: APP_PATHS.GOLD_CHARTS, icon: <ShowChartIcon /> },
  { label: 'More', path: APP_PATHS.MORE, icon: <MoreHorizIcon /> },
];

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // Sidebar state

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Sidebar içeriği (sol tarafta sabit menü)
  const sidebar = (
    <Box
      sx={{ 
        width: 280,
        height: '100vh',
        backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
        borderRight: `1px solid ${theme.palette.divider}`,
        pt: 2
      }}
      role="presentation"
    >
      {/* Close Button */}
   {/*    <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 1 }}>
        <IconButton
          onClick={handleSidebarToggle}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Box> */}

      {/* Logo/Title */}
      <Box sx={{ px: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccountBalanceWalletIcon 
            sx={{ 
              mr: 1.5, 
              color: 'primary.main',
              fontSize: '1.8rem' 
            }} 
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            Budget Tracker
          </Typography>
           <IconButton
          onClick={handleSidebarToggle}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        </Box>
        <Divider />
      </Box>

      {/* Navigation Links */}
      <List sx={{ px: 2 }}>
        {navLinks.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton 
              component={Link} 
              to={item.path}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark' 
            ? '#000000' 
            : '#ffffff',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          color: 'text.primary',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ minHeight: '64px' }}>
            {/* Menu Button - sadece authenticated kullanıcılar için */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleSidebarToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <AccountBalanceWalletIcon 
              sx={{ 
                mr: 1.5, 
                color: 'primary.main',
                fontSize: '1.5rem' 
              }} 
            />
            <Typography
              variant="h6"
              component={Link}
              to={PATHS.HOME}
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: '1.125rem',
              }}
            >
              Budget Tracker
            </Typography>
            {isMobile ? (
              <>
                {/* Mobil görünümde sadece tema değiştirici */}
                <ThemeToggle />
              </>
            ) : (
              // Masaüstü görünümdeki Navbar linklerini güncelliyoruz
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <ThemeToggle />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={handleSidebarToggle}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {sidebar}
      </Drawer>
    </>
  );
}

export default Navbar;