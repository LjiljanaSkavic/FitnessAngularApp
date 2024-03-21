import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivityLogRequest } from "../../../models/ActivityLogRequest";
import { UserStoreService } from "../../../services/user-store.service";
import { ActivityLogService } from "../../../services/activity-log.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-add-activity-log-details-modal',
    templateUrl: './add-activity-log-modal.component.html',
    styleUrls: ['./add-activity-log-modal.component.scss']
})
export class AddActivityLogModalComponent implements OnInit {
    activityLogForm: FormGroup;
    activityLogRequest: ActivityLogRequest;
    userId: number;

    constructor(private _userStoreService: UserStoreService,
                private _activityLogService: ActivityLogService,
                private dialogRef: MatDialogRef<AddActivityLogModalComponent>) {
    }

    ngOnInit() {
        if (this._userStoreService.getIsLoggedIn()) {
            this.userId = this._userStoreService.getLoggedInUser().id;
        }
        this.buildEmptyActivityLogForm();
    }

    onDialogClose() {
        this.prepareActivityLog();
    }

    prepareActivityLog() {
        this.activityLogRequest = {
            appUserId: this.userId,
            currentWeightLbs: +this.activityLogForm.get('currentWeightLbs').value,
            date: this.activityLogForm.get('date').value,
            duration: this.activityLogForm.get('duration').value,
            kcalIntake: +this.activityLogForm.get('kcalIntake').value,
            notes: this.activityLogForm.get('notes').value,
            type: +this.activityLogForm.get('type').value
        }
        console.log(this.activityLogRequest);
        this._activityLogService.createActivityLog(this.activityLogRequest).subscribe(res => {
            console.log(res);
            this.dialogRef.close(res);
        })
    }

    buildEmptyActivityLogForm() {
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
