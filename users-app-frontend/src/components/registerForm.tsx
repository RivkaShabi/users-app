import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { RegisterFormInputs } from '../models/interface.ts';
import { register as registerUser } from '../services/authService.ts';
import { backToLoginStyle, formTitleStyle, registerBoxStyle } from './registerForm.styles.ts';

// Validation schema for registration form using yup
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

export const RegisterForm: React.FC = () => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Handle registration form submission
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      console.log('[RegisterForm] Registering user:', data.username);
      await registerUser(data);
      alert('Registration successful! You can now log in with your new account.');
      navigate('/login');
    } catch (error: any) {
      // Show error toast and log error
      toast.error(`Error: ${error.message} (status ${error.status})`);
      console.error('[RegisterForm] Registration error:', error);
    }
  };

  // Render registration form
  return (
    <Box sx={registerBoxStyle}>
      <Typography variant='h5' mb={2} sx={formTitleStyle}>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='First Name'
          fullWidth
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          margin='normal'
        />
        <TextField
          label='Last Name'
          fullWidth
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          margin='normal'
        />
        <TextField
          label='Username'
          fullWidth
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin='normal'
        />
        <TextField
          label='Email'
          type='email'
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin='normal'
        />
        <TextField
          label='Phone'
          fullWidth
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          margin='normal'
        />
        <TextField
          label='Password'
          type='password'
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin='normal'
        />
        <TextField
          label='Confirm Password'
          type='password'
          fullWidth
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          margin='normal'
        />
        <Button variant='contained' color='primary' fullWidth type='submit' sx={{ mt: 2 }}>
          Create Account
        </Button>
        <Button
          onClick={() => {
            console.log('[RegisterForm] Navigating to login');
            navigate('/login');
          }}
          sx={backToLoginStyle}
        >
          Already have an account? Log in
        </Button>
      </form>
    </Box>
  );
};
