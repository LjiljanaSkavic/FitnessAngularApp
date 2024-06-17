import { ActivityLog } from "./activity-log-request";
import { FitnessProgramPurchase } from "./fitness-program-purchase";

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
