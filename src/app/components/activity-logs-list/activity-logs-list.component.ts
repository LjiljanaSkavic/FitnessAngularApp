import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Subscription, switchMap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddActivityLogModalComponent } from "./add-activity-log-modal/add-activity-log-modal.component";
import { ActivityLog } from "../../models/ActivityLogRequest";
import { ActivityLogService } from "../../services/activity-log.service";
import { UserStoreService } from "../../services/user-store.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
    selector: 'app-activity-logs-list',
    templateUrl: './activity-logs-list.component.html',
    styleUrls: ['./activity-logs-list.component.scss']
})
export class ActivityLogsListComponent implements OnInit, OnDestroy {
    isLoading = false;
    userId: number;
    activityLogs: ActivityLog[] = [];
    displayedColumns: string[] = ['date', 'duration', 'type', 'currentWeight', 'kcalIntake'];
    subs = new Subscription();
    pageSizeOptions: number[] = [5, 10];
    pageSize = 5;
    pageIndex = 0;
    totalItems = 0;

    subscription = new Subscription();


    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private _userStoreService: UserStoreService,
                private _activityLogService: ActivityLogService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        if (this._userStoreService.getIsLoggedIn()) {
            this.userId = this._userStoreService.getLoggedInUser().id;
            this.subscription.add(this._activityLogService.search(this.userId).subscribe(res => {
                console.log(res);
                console.log(res.activityLogs)
                this.activityLogs = res.activityLogs;
                this.totalItems = res.totalElements;
                this.isLoading = false;
                this.displayActivityLogs();
            }));
        }
    }

    onAddNewActivityLogClick() {
        this.dialog.open(AddActivityLogModalComponent).afterClosed().pipe(switchMap(result => {
            if (result) {
                //TODO: PUSH INTO ARRAY of activity logs
                return EMPTY;
            }
            return EMPTY;
        })).subscribe(res => {
            console.log(res)
        });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.displayActivityLogs();
    }

    displayActivityLogs() {
        this.isLoading = true;
        this.subs.add(this._activityLogService.search(this.userId).subscribe(res => {
            this.activityLogs = res.activityLogs;
            this.totalItems = res.totalElements;
            this.isLoading = false;
        }));
    }

    ondDownloadMyActivityLogs() {
        this.subscription.add(this._activityLogService.downloadActivityLogs(this.userId).subscribe(
            (data: Blob) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                document.body.appendChild(a);
                a.href = url;
                a.download = 'activity_logs.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            },
            (error) => {
                console.error('Error downloading activity logs:', error);
                // Handle error as needed
            }
        ));
    }
}
