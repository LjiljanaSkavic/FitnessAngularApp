import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivityLog } from "../../../models/activity-log-request";

@Component({
  selector: 'app-activity-log-details',
  templateUrl: './activity-log-details.component.html',
  styleUrls: ['./activity-log-details.component.scss']
})
export class ActivityLogDetailsComponent implements OnInit {
  @Input() activityLog: ActivityLog;
  activityLogForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.buildActivityLogForm();
  }

  buildActivityLogForm() {
    this.activityLogForm = new FormGroup({
      date: new FormControl(this.activityLog.date, Validators.required),
      duration: new FormControl(this.activityLog.duration, Validators.required),
      type: new FormControl(this.activityLog.type, Validators.required),
      currentWeightLbs: new FormControl(this.activityLog.currentWeightLbs, Validators.required),
      notes: new FormControl(this.activityLog.notes, Validators.required),
      kcalIntake: new FormControl(this.activityLog.kcalIntake, Validators.required),
    });
  }
}
