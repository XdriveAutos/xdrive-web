import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/queries/useAuth';
import type { VerifyForgotPasswordRequest } from '@/interfaces';

const VerifyForgotPassword = () => {
  const navigate = useNavigate();
  const { verifyOtp, verifyOtpStatus, verifyOtpError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForgotPasswordRequest>();
  const [email] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('email') || '';
  });

  const onSubmit = async (data: VerifyForgotPasswordRequest) => {
    try {
      await verifyOtp(data);
      navigate('/reset-password', { state: { email: data.email } });
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/forgot-password')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowBackIcon fontSize="small" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-lg mb-4 shadow-lg">
            <LockIcon className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Code</h1>
          <p className="text-gray-600">
            We've sent a verification code to your email address
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div>
              <Input
                label="Email Address"
                type="email"
                defaultValue={email}
                placeholder="admin@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                errorMessage={errors.email?.message as string | undefined}
              />
            </div>

            {/* OTP Input */}
            <div>
              <Input
                label="Verification Code"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                {...register('code', {
                  required: 'Verification code is required',
                  minLength: {
                    value: 6,
                    message: 'Code must be 6 digits',
                  },
                  maxLength: {
                    value: 6,
                    message: 'Code must be 6 digits',
                  },
                })}
                errorMessage={errors.code?.message as string | undefined}
              />
            </div>

            {/* Submit Button */}
            <Button
              fullWidth
              loading={verifyOtpStatus === 'pending'}
              disabled={verifyOtpStatus === 'pending'}
              type="submit"
            >
              Verify Code
            </Button>
          </form>

          {/* Error Alert */}
          {verifyOtpError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {verifyOtpError.message || 'Invalid code. Please try again.'}
            </div>
          )}

          {/* Resend Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Request a new one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForgotPassword;
