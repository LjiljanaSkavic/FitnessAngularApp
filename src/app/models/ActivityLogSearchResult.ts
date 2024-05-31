import { ActivityLog } from "./ActivityLogRequest";
import { FitnessProgramPurchase } from "./FitnessProgramPurchase";

//TODO: Add generic type
export interface ActivityLogSearchResult {
  activityLogs: ActivityLog[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
}


export interface FitnessProgramPurchaseSearchResult {
  fitnessProgramPurchases: FitnessProgramPurchase[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
}
