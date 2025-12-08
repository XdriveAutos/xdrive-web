import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/queries/useAuth';
import type { LoginRequest } from '@/interfaces';

const Home = () => {
  const navigate = useNavigate();
  const { login, loginStatus, loginError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const getErrorMessage = (field: keyof LoginRequest) => {
    return errors[field]?.message as string | undefined;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-lg mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">X</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Secure access to manage your platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@example.com"
                icon={<EmailIcon fontSize="small" />}
                iconPosition="start"
                errorMessage={getErrorMessage('email')}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>

            {/* Password Input */}
            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ mr: -1 }}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </IconButton>
                }
                iconPosition="end"
                errorMessage={getErrorMessage('password')}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Keep me signed in</span>
            </label>

            {/* Login Button */}
            <Button
              fullWidth
              loading={loginStatus === 'pending'}
              disabled={loginStatus === 'pending'}
              type="submit"
            >
              Secure Sign In
            </Button>
          </form>

          {/* Error Alert */}
          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {loginError.message || 'Login failed. Please try again.'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>Secure Administrative Access</span>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            © 2025 TakeNTrade. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
