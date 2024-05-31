import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Subscription, switchMap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddActivityLogModalComponent } from "./add-activity-log-modal/add-activity-log-modal.component";
import { ActivityLog } from "../../models/ActivityLogRequest";
import { ActivityLogService } from "../../services/activity-log.service";
import { UserStoreService } from "../../services/user-store.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { ConfirmationModalComponent } from "../../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-activity-logs-list',
  templateUrl: './activity-logs-list.component.html',
  styleUrls: ['./activity-logs-list.component.scss']
})
export class ActivityLogsListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = false;
  userId: number;
  activityLogs: ActivityLog[] = [];
  displayedColumns: string[] = ['date', 'duration', 'type', 'currentWeight', 'kcalIntake', 'edit', 'delete'];
  subs = new Subscription();
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  subscription = new Subscription();
  protected readonly localStorage = localStorage;

  constructor(private _userStoreService: UserStoreService,
              private _activityLogService: ActivityLogService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this._userStoreService.getIsLoggedIn()) {
      this.userId = this._userStoreService.getLoggedInUser().id;
      this.displayActivityLogs();
    }
  }

  onAddNewActivityLogClick(): void {
    this.dialog.open(AddActivityLogModalComponent, {
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().subscribe(result => {
      if (result) {
        const calculatedPageIndex = Math.ceil((this.totalItems + 1) / 5);
        this.pageIndex = calculatedPageIndex - 1;
        this.displayActivityLogs();
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.displayActivityLogs();
  }

  displayActivityLogs(): void {
    this.isLoading = true;
    this.subs.add(this._activityLogService.search(this.userId, this.pageIndex, this.pageSize).subscribe(res => {
      this.activityLogs = res.activityLogs;
      this.totalItems = res.totalElements;
      this.isLoading = false;
    }));
  }

  ondDownloadMyActivityLogs(): void {
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
      }
    ));
  }

  onEditActivityLogClick(activityLog: ActivityLog): void {
    this.dialog.open(AddActivityLogModalComponent, {
      data: {
        activityLog: activityLog
      },
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().subscribe(result => {
      if (result) {
        const activityLogIndex = this.activityLogs.findIndex(activityLog => activityLog.id === result.id);

        if (activityLogIndex !== -1) {
          this.activityLogs[activityLogIndex] = result;
          this.activityLogs = [...this.activityLogs];
        }
      }
    });
  }

  onDeleteActivityLogClick(activityLog: ActivityLog): void {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete activity log",
        text: "Are you sure that you want to delete this activity log?"
      },
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().pipe(switchMap(result => {
      return result ? this._activityLogService.deleteById(activityLog.id) : EMPTY
    })).subscribe(res => {
      const index = this.activityLogs.findIndex(aLog => aLog.id === activityLog.id);
      if (index !== -1) {
        this.displayActivityLogs();
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
