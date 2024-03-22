import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ActivityLog, ActivityLogRequest } from "../models/ActivityLogRequest";
import { ActivityLogSearchResult } from "../models/ActivityLogSearchResult";

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

    search(userId: number, type?: number, startDate?: Date, endDate?: Date, page?: number, size?: number): Observable<ActivityLogSearchResult> {
        return this._httpClient.get<ActivityLogSearchResult>(`${this.baseUrl}/search?appUserId=${userId}`);
        // return this._httpClient.get<ActivityLogSearchResult>(`${this.baseUrl}/search?appUserId=${userId}&type=${type}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`);
    }

    downloadActivityLogs(userId: number): Observable<Blob> {
        const headers = new HttpHeaders({'Content-Type': 'application/pdf'});
        const downloadActivityLogsUrl = `${this.baseUrl}/download/${userId}`;
        return this._httpClient.get(downloadActivityLogsUrl, {responseType: 'arraybuffer', headers})
            .pipe(
                map((data: ArrayBuffer) => {
                    return new Blob([data], {type: 'application/pdf'});
                })
            );
    }
}
