import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from '@/stores';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { admin, clearAuth } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearAuth();
    handleMenuClose();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        backgroundColor: '#1a1a1a',
        backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="toggle menu"
            onClick={onMenuToggle}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Xdrive
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notifications */}
          <IconButton
            color="inherit"
            sx={{
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <NotificationsIcon />
          </IconButton>

          {/* Settings */}
          <IconButton
            color="inherit"
            sx={{
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <SettingsIcon />
          </IconButton>

          {/* Profile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', mr: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: '#fff' }}
              >
                {admin?.first_name + ' ' + admin?.last_name || 'Admin'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                {admin?.role || 'Administrator'}
              </Typography>
            </Box>
            <IconButton onClick={handleMenuOpen} sx={{ padding: 0 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background:
                    'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {getInitials(admin?.first_name + ' ' + admin?.last_name || 'A')}
              </Avatar>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            color: '#fff',
            mt: 1.5,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            '& .MuiMenuItem-root': {
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default AdminHeader;
