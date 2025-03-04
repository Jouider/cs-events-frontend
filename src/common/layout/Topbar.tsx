import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box,
  Container,
  InputBase,
  Stack,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Badge,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Popover,
} from '@mui/material';
import { styled, alpha } from '@mui/system';
import {
  Search as SearchIcon,
  LocationOn,
  KeyboardArrowDown,
  HelpOutline,
  ConfirmationNumber,
  NotificationsNone,
  AccountCircle,
  Settings,
  Logout,
  Person,
  EventNote,
  PlusOne,
  HdrPlus,
  Event,
} from '@mui/icons-material';
import useAuth from '@modules/auth/hooks/api/useAuth';
import Routes from '@common/defs/routes';
import SearchBar from '@common/layout/SearchBar';
import Pusher from 'pusher-js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Notification {
  id: number;
  message: string;
  event_id: number;
  read: boolean;
  created_at: string;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  position: 'fixed',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',
  border: '2px solid #DBDAE3',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  '&:hover': {
    borderColor: '#A9A8B3',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#6F7287',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#1E0A3C',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    '&::placeholder': {
      color: '#6F7287',
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#1E0A3C',
  textTransform: 'none',
  padding: '8px 12px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: 'rgba(30, 10, 60, 0.04)',
  },
}));

const CreateEventButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#D1410C',
  color: '#FFFFFF',
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#B23509',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 35,
                cursor: 'pointer',
  border: '2px solid transparent',
  transition: 'all 0.2s ease',
                      '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const NotificationItem = styled(ListItem)(({ theme }) => ({
  padding: '16px',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
                      '&:hover': {
    backgroundColor: 'rgba(30, 10, 60, 0.04)',
                      },
  cursor: 'pointer',
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#D1410C',
    color: 'white',
                },
}));

const Topbar: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [helpAnchorEl, setHelpAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      const pusher = new Pusher('59f0dfc0bca12de4cbfe', {
        cluster: 'eu',
        encrypted: true,
      });

      const channel = pusher.subscribe(`private.user.${user.id}`);
      
      channel.bind('booking.created', (data: Notification) => {
        setNotifications(prev => [{
          ...data,
          read: false,
          created_at: new Date().toISOString()
        }, ...prev]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
};
    }
  }, [user]);

  useEffect(() => {
    console.log('Current notifications:', notifications);
  }, [notifications]);

  const handleHelpMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHelpAnchorEl(event.currentTarget);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleHelpMenuClose = () => {
    setHelpAnchorEl(null);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Notification icon clicked');
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    console.log('Notification popover closing');
    setNotificationAnchorEl(null);
  };

  const handleNotificationItemClick = (notification: Notification) => {
    router.push(`/events/${notification.event_id}`);
    handleNotificationClose();
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleUserMenuClose();
      router.push(Routes.Auth.Login);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <StyledAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: '8px 0' }}>
            <Typography
              variant="h6"
              onClick={() => router.push('/')}
              sx={{
                fontWeight: 800,
                fontSize: '24px',
                color: '#D1410C',
                cursor: 'pointer',
              }}
            >
              eventbrite
            </Typography>

            <SearchBar />

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={1} alignItems="center">
              <NavButton onClick={() => router.push('/events')}>Browse Events</NavButton>
              <NavButton onClick={() => router.push(Routes.Events.CreateEvent)}>Host an Event</NavButton>
              <NavButton endIcon={<KeyboardArrowDown />} onClick={handleHelpMenuOpen}>
                Help
              </NavButton>

              {user ? (
                <>
                  <IconButton 
                    size="large" 
                    sx={{ color: '#1E0A3C' }}
                    onClick={handleNotificationClick}  // Add this line
                  >
                    <NotificationBadge badgeContent={unreadCount} color="error">
                      <NotificationsNone />
                    </NotificationBadge>
                  </IconButton>

                  <Popover
                    anchorEl={notificationAnchorEl}
                    open={Boolean(notificationAnchorEl)}
                    onClose={handleNotificationClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      sx: {
                        width: 360,
                        maxHeight: 400,
                        overflow: 'auto',
                      },
                    }}
                  >
                    <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                      <Typography variant="h6">Notifications</Typography>
                    </Box>
                    <List sx={{ p: 0 }}>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            onClick={() => handleNotificationItemClick(notification)}
                            sx={{
                              backgroundColor: notification.read ? 'transparent' : 'rgba(209, 65, 12, 0.05)',
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: '#D1410C' }}>
                                <Event />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={notification.message}
                              secondary={notification.created_at && dayjs(notification.created_at).fromNow()}
                              primaryTypographyProps={{
                                variant: 'body1',
                                color: notification.read ? 'text.primary' : '#D1410C',
                              }}
                            />
                          </NotificationItem>
                        ))
                      ) : (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                          <Typography color="text.secondary">
                            No notifications yet
                          </Typography>
                        </Box>
                      )}
                    </List>
                  </Popover>

                  <IconButton
                    size="large"
                    sx={{ color: '#1E0A3C' }}
                    onClick={() => router.push(Routes.Bookings.ReadAll)}
                  >
                    <ConfirmationNumber />
                  </IconButton>
                  <Box>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <UserAvatar onClick={handleUserMenuOpen} src={user.avatarUrl} alt={user.name}>
                        {!user.avatarUrl && user.name?.charAt(0)}
                      </UserAvatar>
                    </StyledBadge>
                  </Box>
                </>
              ) : (
                <>
                  <NavButton onClick={() => router.push(Routes.Auth.Login)}>Log In</NavButton>
                  <NavButton
                    variant="contained"
                    onClick={() => router.push(Routes.Auth.Register)}
                    sx={{
                      backgroundColor: '#1E0A3C',
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#3D1C78',
                      },
                    }}
                  >
                    Sign Up
                  </NavButton>
                </>
              )}
            </Stack>

            <Menu
              anchorEl={helpAnchorEl}
              open={Boolean(helpAnchorEl)}
              onClose={handleHelpMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleHelpMenuClose}>
                <ListItemIcon>
                  <HelpOutline fontSize="small" />
                </ListItemIcon>
                Help Center
              </MenuItem>
              <MenuItem onClick={handleHelpMenuClose}>Find Support</MenuItem>
              <MenuItem onClick={handleHelpMenuClose}>Contact Us</MenuItem>
            </Menu>

            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" noWrap>
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {user?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleUserMenuClose();
                  router.push('/profile');
                }}
              >
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleUserMenuClose();
                  router.push('/bookings');
                }}
              >
                <ListItemIcon>
                  <EventNote fontSize="small" />
                </ListItemIcon>
                My Bookings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleUserMenuClose();
                  router.push('/settings');
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Toolbar />
    </>
  );
};

export default Topbar;
