/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useThemeContext } from '../context/ThemeContext';
import { useMutation } from '@tanstack/react-query';
import { loginService } from '../services/authServices';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'At least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { mode } = useThemeContext();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch()

  const { mutate: login, isPending } = useMutation<void, Error, LoginFormValues>({
    mutationFn: (data) => loginService(data.email, data.password),
    onSuccess: (data: any) => {
      dispatch(setCredentials({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }));
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      setError("Username or password is incorrect");
    }
  })

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log('Login data:', data);
    setError(null);
    login(data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 3,
          boxShadow: mode === 'light' ? 3 : 6,
        }}
      >
        <CardContent>
          <Typography variant="h4" mb={2} textAlign="center">
            Sign In
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Email"
              fullWidth
              {...register('email')}
              error={!!errors.email || !!error}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register('password')}
              error={!!errors.password || !!error}
              helperText={errors.password?.message}
            />

            {error && (
              <Typography color="error" variant="body2" textAlign="center">
                {error}
              </Typography>
            )}

            <Button disabled={isPending} type="submit" variant="contained" size="large" fullWidth>
              {isPending ? "Signing In..." : "Sign In"}
            </Button>

            <Typography variant="body2" textAlign="center" mt={1}>
              Don’t have an account?{' '}
              <Link component="button" type='button' onClick={() => navigate(ROUTES.SIGN_UP)}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
