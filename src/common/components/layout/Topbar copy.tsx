import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import SearchBar from '../../layout/SearchBar';
import UserMenu from '../../layout/UserMenu';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Logo = styled('img')({
  height: '2rem',
  marginRight: '1rem',
});

const Topbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should be managed by your auth system

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Logo src="/assets/meetup-logo.svg" alt="Meetup" />
        <SearchBar />
        <Box sx={{ flexGrow: 1 }} />
        
        <IconButton color="inherit">
          <LanguageIcon />
        </IconButton>

        {isLoggedIn ? (
          <>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <ConfirmationNumberIcon />
            </IconButton>
            <Button variant="contained" color="primary" sx={{ mx: 1 }}>
              Create Event
            </Button>
            <UserMenu />
          </>
        ) : (
          <>
            <Button color="inherit">Log in</Button>
            <Button variant="contained" color="primary" sx={{ ml: 1 }}>
              Sign up
            </Button>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Topbar;
