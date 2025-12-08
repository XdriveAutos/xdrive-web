import type { BaseResponse } from './base';
import type { Admin } from './users';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyForgotPasswordRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export interface LoginResponseData {
  admin: Admin;
  token: string;
  token_type: 'Bearer';
}

export type LoginResponse = BaseResponse<LoginResponseData>;
export type ForgotPasswordResponse = BaseResponse;
export type VerifyForgotPasswordResponse = BaseResponse;
export type ResetPasswordResponse = BaseResponse;
