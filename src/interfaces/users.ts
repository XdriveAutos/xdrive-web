export interface Admin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  phone_number: string;
  country: string;
  town_city: string;
  state: string;
  address: string | null;
  profile_image: string | null;
  profile_image_id: string | null;
  role: 'admin';
  status: 'active' | 'inactive' | 'suspended';
  suspended_at: string | null;
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  marketing_emails: boolean;
  language: string;
  timezone: string;
  created_at: string;
  updated_at: string;
  last_seen_at: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}
