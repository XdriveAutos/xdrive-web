import type { BaseResponse, PaginatedData } from './base';

export type NotificationAudience =
  | 'all'
  | 'admins'
  | 'mechanics'
  | 'workshops'
  | 'users';

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, any> | null;
  read_at: string | null;
  is_read: boolean;
  created_at: string;
  time_ago: string;
}

export interface BroadcastNotificationRequest {
  title: string;
  body: string;
  audience: NotificationAudience;
  data?: Record<string, any> | null;
}

export interface SendNotificationRequest {
  title: string;
  body: string;
  data?: Record<string, any> | null;
}

export type GetNotificationsResponse = BaseResponse<
  PaginatedData<Notification>
>;
