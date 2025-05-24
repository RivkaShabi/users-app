import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UserFormInputs, UserFormProps } from '../models/interface.ts';
import { selectSession } from '../redux/sessionSlice.ts';
import { createUser, getUserById, updateUser } from '../services/userService.ts';
import { topBarStyle } from './usersPage.styles.ts';

// UserForm handles both creating and editing users
export const UserForm: React.FC<UserFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const session = useSelector(selectSession);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserFormInputs>();

  useEffect(() => {
    // Fetch user data if in edit mode
    const fetchUser = async () => {
      if (id && mode === 'edit') {
        console.log('Fetching user with id:', id);
        const user = await getUserById(Number(id), session.username);
        if (user && user.data.user) {
          const userData = user.data.user;
          setValue('first_name', userData.first_name || '');
          setValue('last_name', userData.last_name || '');
          setValue('email', userData.email || '');
          setValue('avatar', userData.avatar || '');
          console.log('User data loaded into form:', userData);
        } else {
          console.error('User not found for id:', id);
          navigate('/users/list-users');
        }
      } else if (mode === 'edit') {
        console.error('User not found or invalid ID');
        navigate('/users/list-users');
      } else {
        reset();
        console.log('Form reset for create mode');
      }
    };
    fetchUser();
  }, []);

  // Handles form submission for both create and edit
  const onSubmit = async (data: UserFormInputs) => {
    console.log('Submitting form data:', data);
    if (mode === 'edit') {
      const result = await updateUser({ ...data, id: Number(id) }, session.username);
      if (result && result.status === 200) {
        console.log('User updated successfully');
        navigate('/users/list-users');
        reset();
      } else {
        console.error('Failed to update user');
      }
    } else {
      const result = await createUser(data, session.username);
      if (result) {
        console.log('User created successfully');
        navigate('/users/list-users');
        reset();
      } else {
        console.error('Failed to create user');
      }
    }
  };

  const handleBackList = () => {
    console.log('Navigating back to user list');
    navigate('/users/list-users');
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', gap: 2, flexDirection: 'column', p: 2 }}
    >
      {/* Top bar with title and back button */}
      <Box sx={topBarStyle}>
        <Typography variant='h5'>{mode === 'edit' ? 'Edit User' : 'Create User'}</Typography>
        <Button variant='contained' onClick={handleBackList}>
          Back to List Users
        </Button>
      </Box>
      {/* Form fields with validation */}
      <TextField
        label='First Name'
        {...register('first_name', { required: 'First name is required' })}
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
      />
      <TextField
        label='Last Name'
        {...register('last_name', { required: 'Last name is required' })}
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
      />
      <TextField
        label='Email'
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label='Avatar'
        {...register('avatar', { required: 'Avatar is required' })}
        error={!!errors.avatar}
        helperText={errors.avatar?.message}
      />
      <Button variant='contained' type='submit'>
        {mode === 'edit' ? 'Update User' : 'Create User'}
      </Button>
    </Box>
  );
};
