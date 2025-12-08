import type { BaseResponse } from './base';

export interface MaintenanceStatus {
  enabled: boolean;
  bypass_url: string | null;
}

// Response types
export type GetMaintenanceStatusResponse = BaseResponse<MaintenanceStatus>;
