import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivityLog, ActivityLogRequest } from "../models/ActivityLogRequest";

@Injectable({
    providedIn: 'root'
})
export class ActivityLogService {
    baseUrl = "http://localhost:9000/activity-log";

    constructor(private _httpClient: HttpClient) {
    }

    createActivityLog(activityLogRequest: ActivityLogRequest): Observable<ActivityLog> {
        return this._httpClient.post<ActivityLog>(this.baseUrl, activityLogRequest);
    }

    getAll(userId: number): Observable<ActivityLog[]> {
        const allActivityLogsUrl = `${this.baseUrl}/${userId}`
        return this._httpClient.get<ActivityLog[]>(allActivityLogsUrl);
    }
}
