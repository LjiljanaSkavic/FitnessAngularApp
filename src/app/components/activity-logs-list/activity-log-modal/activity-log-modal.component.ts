import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivityLog, ActivityLogRequest } from "../../../models/activity-log-request";
import { UserStoreService } from "../../../services/user-store.service";
import { ActivityLogService } from "../../../services/activity-log.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IntensityType } from "../../../models/intensity-type";
import { Subscription } from "rxjs";

export interface ActivityLogModalData {
  activityLog: ActivityLog;
}

@Component({
  selector: 'app-add-activity-log-details-modal',
  templateUrl: './activity-log-modal.component.html',
  styleUrls: ['./activity-log-modal.component.scss']
})
export class ActivityLogModalComponent implements OnInit, OnDestroy {
  activityLogForm: FormGroup;
  activityLogRequest: ActivityLogRequest;
  userId: number;
  isEditMode = false;
  intensityTypes: IntensityType[] = [
    {id: 1, name: 'Low'},
    {id: 2, name: 'Moderate'},
    {id: 3, name: 'High'}
  ];
  subscriptions = new Subscription();

  constructor(private _userStoreService: UserStoreService,
              private _activityLogService: ActivityLogService,
              private dialogRef: MatDialogRef<ActivityLogModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ActivityLogModalData) {
  }

  ngOnInit(): void {
    if (this._userStoreService.getIsLoggedIn()) {
      this.userId = this._userStoreService.getLoggedInUser().id;
    }
    this.isEditMode = this.data !== null;
    this.buildActivityLogForm();
  }

  onDialogClose(): void {
    this.prepareActivityLog();
  }

  prepareActivityLog(): void {
    this.activityLogRequest = {
      appUserId: this.userId,
      currentWeightLbs: +this.activityLogForm.get('currentWeightLbs').value,
      date: this.activityLogForm.get('date').value,
      duration: this.activityLogForm.get('duration').value,
      kcalIntake: +this.activityLogForm.get('kcalIntake').value,
      notes: this.activityLogForm.get('notes').value,
      type: +this.activityLogForm.get('type').value
    }

    if (this.isEditMode) {
      this.activityLogRequest.id = this.data.activityLog.id;
      this.subscriptions.add(
        this._activityLogService.updateActivityLog(this.activityLogRequest).subscribe(res => {
          this.dialogRef.close(res);
        }));
    } else {
      this.subscriptions.add(
        this._activityLogService.createActivityLog(this.activityLogRequest).subscribe(res => {
          this.dialogRef.close(res);
        }));
    }
  }

  buildActivityLogForm(): void {
    if (this.isEditMode) {
      this.activityLogForm = new FormGroup({
        date: new FormControl(this.data.activityLog.date, Validators.required),
        duration: new FormControl(this.data.activityLog.duration, Validators.required),
        type: new FormControl(this.data.activityLog.type, Validators.required),
        currentWeightLbs: new FormControl(this.data.activityLog.currentWeightLbs, Validators.required),
        notes: new FormControl(this.data.activityLog.notes, Validators.required),
        kcalIntake: new FormControl(this.data.activityLog.kcalIntake, Validators.required),
      });
    } else {
      this.activityLogForm = new FormGroup({
        date: new FormControl(null, Validators.required),
        duration: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required),
        currentWeightLbs: new FormControl(null, Validators.required),
        notes: new FormControl(null, Validators.required),
        kcalIntake: new FormControl(null, Validators.required),
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
