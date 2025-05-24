import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { LoginFormInputs } from '../models/interface.ts';
import { setSession } from '../redux/sessionSlice.ts';
import { login } from '../services/authService.ts';
import { formTitleStyle, loginBoxStyle, newUserButtonStyle } from './loginForm.styles.ts';

// Validation schema for login form
const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const LoginForm: React.FC = () => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Handle login form submission
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log('[LoginForm] Attempting login for:', data.username);
      const token = await login(data);
      localStorage.setItem(`token_${data.username}`, token);
      setErrorMsg(null);
      dispatch(setSession({ username: data.username }));
      navigate('/users');
    } catch (err: any) {
      const error = err as { status?: number; message: string };
      console.error('[LoginForm] Login error:', error);
      if (error.status === 400) {
        setErrorMsg(error.message);
      } else {
        toast.error(`Error: ${error.message} (status ${error.status})`);
      }
    }
  };

  // Render login form
  return (
    <Box sx={loginBoxStyle}>
      <Typography variant='h5' mb={2} sx={formTitleStyle}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Username'
          fullWidth
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
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
        <Button variant='contained' color='primary' fullWidth type='submit' sx={{ mt: 2 }}>
          Login
        </Button>
        {errorMsg && (
          <Typography color='error' sx={{ mt: 2 }}>
            {errorMsg}
          </Typography>
        )}
        <Button onClick={() => navigate('/register')} sx={newUserButtonStyle}>
          New user? Click here to register
        </Button>
      </form>
    </Box>
  );
};