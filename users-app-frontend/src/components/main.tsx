import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { selectSession } from '../redux/sessionSlice.ts';
import { MenuSideBar } from './menuSideBar.tsx';
import { UserForm } from './userForm.tsx';
import { UsersPage } from './usersPage.tsx';

// Main component for routing and session check
export const Main: React.FC = () => {
  const username = useSelector(selectSession).username;
  const navigate = useNavigate();

  // Redirect to login if no username in session
  useEffect(() => {
    if (!username) {
      console.log('[Main] No username found, redirecting to login');
      localStorage.removeItem(`token_${username}`);
      navigate('/login');
    }
  }, [username]);

  // Render sidebar and main routes
  return (
    <>
      <MenuSideBar />
      <Routes>
        <Route path='/' element={<Navigate to='/users/list-users' />} />
        <Route path='/list-users' element={<UsersPage />} />
        <Route path='/create' element={<UserForm mode='create' />} />
        <Route path='/edit/:id' element={<UserForm mode='edit' />} />
      </Routes>
    </>
  );
};
