import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/queries/useAuth';
import type { ForgotPasswordRequest } from '@/interfaces';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, forgotPasswordStatus, forgotPasswordError } =
    useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>();

  const onSubmit = async (data: ForgotPasswordRequest) => {
    try {
      await forgotPassword(data);
      navigate('/verify-forgot-password');
    } catch (err) {
      console.error('Forgot password request failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowBackIcon fontSize="small" />
          <span className="text-sm font-medium">Back to Login</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-lg mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">X</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a code to reset your
            password
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
                placeholder="admin@example.com"
                icon={<EmailIcon fontSize="small" />}
                iconPosition="start"
                errorMessage={errors.email?.message as string | undefined}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>

            {/* Submit Button */}
            <Button
              fullWidth
              loading={forgotPasswordStatus === 'pending'}
              disabled={forgotPasswordStatus === 'pending'}
              type="submit"
            >
              Send Reset Code
            </Button>
          </form>

          {/* Error Alert */}
          {forgotPasswordError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {forgotPasswordError.message ||
                'Failed to send reset code. Please try again.'}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Check your email for the password reset
              code. It may take a few minutes to arrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
