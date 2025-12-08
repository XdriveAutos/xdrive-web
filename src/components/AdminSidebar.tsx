import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    label: 'Management',
    icon: <GroupIcon />,
    children: [
      { label: 'Users', icon: <GroupIcon />, path: '/management/users' },
      {
        label: 'Mechanics',
        icon: <BuildIcon />,
        path: '/management/mechanics',
      },
      {
        label: 'Workshops',
        icon: <StorefrontIcon />,
        path: '/management/workshops',
      },
    ],
  },
  {
    label: 'Vehicles',
    icon: <DirectionsCarIcon />,
    children: [
      { label: 'Cars', icon: <DirectionsCarIcon />, path: '/vehicles/cars' },
      {
        label: 'Brands',
        icon: <DirectionsCarIcon />,
        path: '/vehicles/brands',
      },
      {
        label: 'Models',
        icon: <DirectionsCarIcon />,
        path: '/vehicles/models',
      },
      {
        label: 'Body Types',
        icon: <DirectionsCarIcon />,
        path: '/vehicles/body-types',
      },
    ],
  },
  {
    label: 'Services',
    icon: <ReceiptIcon />,
    children: [
      { label: 'Services', icon: <ReceiptIcon />, path: '/services/list' },
      {
        label: 'Subscriptions',
        icon: <ReceiptIcon />,
        path: '/services/subscriptions',
      },
      { label: 'Plans', icon: <ReceiptIcon />, path: '/services/plans' },
    ],
  },
  {
    label: 'System',
    icon: <SettingsIcon />,
    children: [
      { label: 'Settings', icon: <SettingsIcon />, path: '/system/settings' },
      {
        label: 'Notifications',
        icon: <SettingsIcon />,
        path: '/system/notifications',
      },
      {
        label: 'Maintenance',
        icon: <SettingsIcon />,
        path: '/system/maintenance',
      },
    ],
  },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Management']);

  const handleExpandClick = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const handleNavigate = (path?: string) => {
    if (path) {
      navigate(path);
      if (isMobile) {
        onClose();
      }
    }
  };

  const isActive = (path?: string) => {
    return path ? location.pathname === path : false;
  };

  const SidebarContent = (
    <Box
      sx={{
        height: '100%',
        background: '#1a1a1a',
        backgroundImage: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
        overflow: 'auto',
        pt: 2,
        pb: 4,
      }}
    >
      <List sx={{ px: 1 }}>
        {SIDEBAR_ITEMS.map((item) => (
          <Box key={item.label}>
            <ListItemButton
              onClick={() => {
                if (item.children) {
                  handleExpandClick(item.label);
                } else {
                  handleNavigate(item.path);
                }
              }}
              sx={{
                borderRadius: '0.5rem',
                mb: 0.5,
                color: isActive(item.path) ? '#3b82f6' : '#d1d5db',
                backgroundColor: isActive(item.path)
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.15)',
                  color: '#fff',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 500,
                  fontSize: '0.95rem',
                }}
              />
              {item.children && (
                <Box sx={{ ml: 'auto' }}>
                  {expandedItems.includes(item.label) ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </Box>
              )}
            </ListItemButton>

            {/* Nested Items */}
            {item.children && (
              <Collapse in={expandedItems.includes(item.label)} timeout="auto">
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.label}
                      onClick={() => handleNavigate(child.path)}
                      sx={{
                        pl: 4,
                        borderRadius: '0.5rem',
                        mb: 0.3,
                        color: isActive(child.path) ? '#3b82f6' : '#9ca3af',
                        backgroundColor: isActive(child.path)
                          ? 'rgba(59, 130, 246, 0.1)'
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#fff',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: 'inherit',
                          minWidth: 40,
                        }}
                      >
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={child.label}
                        primaryTypographyProps={{
                          fontWeight: isActive(child.path) ? 600 : 500,
                          fontSize: '0.9rem',
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>

      {/* Footer Info */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#6b7280',
            display: 'block',
            textAlign: 'center',
          }}
        >
          Xdrive Admin v1.0
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#4b5563',
            display: 'block',
            textAlign: 'center',
            mt: 0.5,
          }}
        >
          © 2025 Xdrive Automobile
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: 280,
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1200,
          pt: '64px',
        }}
      >
        {SidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 280,
            pt: '64px',
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    </>
  );
};

export default AdminSidebar;
