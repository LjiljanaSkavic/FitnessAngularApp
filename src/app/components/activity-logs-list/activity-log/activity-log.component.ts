import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivityLogRequest } from "../../../models/ActivityLogRequest";
import { UserStoreService } from "../../../services/user-store.service";

@Component({
    selector: 'app-activity-log',
    templateUrl: './activity-log.component.html',
    styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
    activityLogForm: FormGroup;
    activityLog: ActivityLogRequest;
    userId: number;

    constructor(private _userStoreService: UserStoreService) {
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
        this.activityLog = {
            appUserId: this.userId,
            currentWeightLbs: +this.activityLogForm.get('currentWeightLbs').value,
            date: this.activityLogForm.get('date').value,
            duration: this.activityLogForm.get('duration').value,
            kcalIntake: +this.activityLogForm.get('kcalIntake').value,
            notes: this.activityLogForm.get('notes').value,
            type: +this.activityLogForm.get('type').value
        }
        console.log(this.activityLog);

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
