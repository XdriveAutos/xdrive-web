import { api, handleApiError } from '@/shared';
import type {
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyForgotPasswordRequest,
  VerifyForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/interfaces';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        '/admin/login',
        credentials,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  forgotPassword: async (
    email: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    try {
      const response = await api.post<ForgotPasswordResponse>(
        '/forgot-password',
        email,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  verifyOtp: async (
    data: VerifyForgotPasswordRequest,
  ): Promise<VerifyForgotPasswordResponse> => {
    try {
      const response = await api.post<VerifyForgotPasswordResponse>(
        '/verify-forgot-password-otp',
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> => {
    try {
      const response = await api.post<ResetPasswordResponse>(
        '/reset-password',
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
