export type NotificationAudience =
  | 'all'
  | 'admins'
  | 'mechanics'
  | 'workshops'
  | 'users';

export interface BroadcastNotificationRequest {
  title: string;
  body: string;
  audience: NotificationAudience;
  data?: string[] | null;
}

export interface SendNotificationRequest {
  title: string;
  body: string;
  data?: string[] | null;
}
