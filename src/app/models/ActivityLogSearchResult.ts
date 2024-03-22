import { ActivityLog } from "./ActivityLogRequest";

//TODO: Add generic type
export interface ActivityLogSearchResult {
    activityLogs: ActivityLog[];
    totalElements: number;
    totalPages: number;
    pageSize: number;
}
