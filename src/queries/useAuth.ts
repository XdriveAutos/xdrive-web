import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyForgotPasswordRequest,
  VerifyForgotPasswordResponse,
} from '@/interfaces';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { clearAuth, setAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data: LoginResponse) => {
      toast.success(data.message);
      setAuth(data.data.admin, data.data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      throw error;
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: ForgotPasswordRequest) =>
      authService.forgotPassword(email),
    onSuccess: (data: ForgotPasswordResponse) => {
      toast.success(data.message || 'Password reset email sent');
    },
    onError: (error) => {
      throw error;
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (data: VerifyForgotPasswordRequest) =>
      authService.verifyOtp(data),
    onSuccess: (data: VerifyForgotPasswordResponse) => {
      toast.success(data.message || 'OTP verified');
    },
    onError: (error) => {
      throw error;
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: (data: ResetPasswordResponse) => {
      toast.success(data.message || 'Password changed');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      throw error;
    },
  });

  const logout = () => {
    clearAuth();
    queryClient.invalidateQueries({ queryKey: ['user'] });
    toast.success('Logged out');
  };

  return {
    login: loginMutation.mutateAsync,
    loginStatus: loginMutation.status,
    loginError: loginMutation.error,

    forgotPassword: forgotPasswordMutation.mutateAsync,
    forgotPasswordStatus: forgotPasswordMutation.status,
    forgotPasswordError: forgotPasswordMutation.error,

    verifyOtp: verifyOtpMutation.mutateAsync,
    verifyOtpStatus: verifyOtpMutation.status,
    verifyOtpError: verifyOtpMutation.error,

    resetPassword: resetPasswordMutation.mutateAsync,
    resetPasswordStatus: resetPasswordMutation.status,
    resetPasswordError: resetPasswordMutation.error,

    logout,
  };
};
