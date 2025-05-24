import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/interface.ts';
import { selectSession } from '../redux/sessionSlice.ts';
import { AppDispatch } from '../redux/store';
import {
  getUsers,
  loadMorePage,
  selectFlagLoadMorePage,
  selectPage,
  selectUsers,
  showLessPage,
} from '../redux/userSlice.ts';
import { deleteUser } from '../services/userService.ts';
import { mainContentStyle, pageContainerStyle, topBarStyle } from './usersPage.styles.ts';
import { UserTable } from './userTable.tsx';

export const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const session = useSelector(selectSession);
  const currentPage = useSelector(selectPage);
  const flagLoadMorePage = useSelector(selectFlagLoadMorePage);

  const navigate = useNavigate();

  // Fetch users when currentPage changes
  useEffect(() => {
    console.log('[UsersPage] Fetching users for page:', currentPage);
    dispatch(getUsers(currentPage));
  }, [currentPage, dispatch]);

  const refreshUsers = () => {
    console.log('[UsersPage] Refreshing users');
    dispatch(getUsers(currentPage));
  };

  // Navigate to create user form
  const handleCreate = () => {
    console.log('[UsersPage] Navigating to create user');
    navigate('/users/create');
  };

  // Navigate to edit user form
  const handleEdit = (user: User) => {
    console.log('[UsersPage] Navigating to edit user:', user.id);
    navigate(`/users/edit/${user.id}`);
  };

  // Delete user and refresh list
  const handleDelete = async (id: number) => {
    console.log('[UsersPage] Deleting user:', id);
    const result = await deleteUser(id, session.username);
    if (result && result.status === 200) {
      console.log('User deleted successfully');
    }
    refreshUsers();
  };

  // Load more users (next page)
  const handleLoadMore = () => {
    console.log('[UsersPage] Load more users');
    dispatch(loadMorePage());
  };

  // Show only first page
  const handleShowLess = () => {
    console.log('[UsersPage] Show less (reset to page 1)');
    dispatch(showLessPage());
  };

  // Render users page with table and paging controls
  return (
    <Box sx={pageContainerStyle}>
      <Box sx={mainContentStyle}>
        <Box sx={topBarStyle}>
          <Typography variant='h5'>Users Management</Typography>
          <Button variant='contained' onClick={handleCreate}>
            Create User
          </Button>
        </Box>

        <UserTable onEdit={handleEdit} onDelete={handleDelete} />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button variant='outlined' onClick={handleLoadMore} disabled={!flagLoadMorePage}>
            Load More
          </Button>
          <Button variant='outlined' onClick={handleShowLess} disabled={currentPage === 1}>
            Show Less
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
