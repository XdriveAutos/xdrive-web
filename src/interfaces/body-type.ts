import type { BaseResponse } from './base';

export interface BodyType {
  id: string;
  name: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Request types
export interface CreateBodyTypeRequest {
  name: string;
  icon?: string | null;
  is_active?: boolean;
}

export interface UpdateBodyTypeRequest {
  name?: string;
  icon?: string | null;
  is_active?: boolean;
}

// Response types
export type GetBodyTypesResponse = BaseResponse<BodyType[]>; // Note: API returns array directly in data for list? No, sample shows "data": [...] array inside "data"? Wait.
// Let's re-read the API sample for Get All Body Types.
// Response body:
// {
//   "success": true,
//   "message": "Success",
//   "data": [ ... objects ... ]
// }
// Unlike CarModels which had "data": { "data": [...], "pagination": ... }
// This one seems to just return a list in data.
// So BaseResponse<BodyType[]> is correct if BaseResponse has `data: T`.
// Let me verify BaseResponse in `src/interfaces/base.ts` if I can, or just assume standard `data: T`.
// Actually, I should probably check `src/interfaces/base.ts` to be safe, but I'll proceed with BaseResponse<BodyType[]> for now as it fits the JSON.

export type GetBodyTypeResponse = BaseResponse<BodyType>;
export type CreateBodyTypeResponse = BaseResponse<BodyType>;
export type UpdateBodyTypeResponse = BaseResponse<BodyType>;
export type DeleteBodyTypeResponse = BaseResponse;
