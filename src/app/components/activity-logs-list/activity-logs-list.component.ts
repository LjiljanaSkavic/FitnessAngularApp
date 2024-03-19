import { Component } from '@angular/core';
import { EMPTY, switchMap } from "rxjs";
import { ActivityLogComponent } from "./activity-log/activity-log.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-activity-logs-list',
    templateUrl: './activity-logs-list.component.html',
    styleUrls: ['./activity-logs-list.component.scss']
})
export class ActivityLogsListComponent {
    isLoading = false;

    constructor(public dialog: MatDialog) {
    }

    onAddNewActivityLogClick() {
        this.dialog.open(ActivityLogComponent).afterClosed().pipe(switchMap(result => {
            if (result) {
                //TODO: Handle this
                return EMPTY;
            }
            return EMPTY;
        })).subscribe(res => {
            console.log(res)
        });
    }
}
