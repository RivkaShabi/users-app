import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSession, selectSession } from '../redux/sessionSlice.ts';
import { pageContainerStyle, sidebarStyle, userNameStyle } from './menuSideBar.styles.ts';

// Sidebar menu with user info and logout
export const MenuSideBar: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const navigate = useNavigate();

  // Handle logout: clear session, remove token, redirect to login
  const handleLogout = () => {
    console.log('[MenuSideBar] Logging out user:', session.username);
    dispatch(clearSession());
    localStorage.removeItem(`token_${session.username}`);
    navigate('/login');
  };

  return (
    <Box sx={pageContainerStyle}>
      <Box sx={sidebarStyle}>
        <Avatar>{session.username.charAt(0).toUpperCase()}</Avatar>
        <Typography sx={userNameStyle}>
          {/* Show username and logout button */}
          Hello {session.username}
          <Button onClick={handleLogout} color='primary' size='small'>
            <LogoutIcon />
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};
