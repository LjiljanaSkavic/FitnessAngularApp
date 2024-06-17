import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { ERROR_HAS_OCCURRED_MESSAGE, snackBarConfig } from "../../shared/contants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

interface DialogData {
  userId: number,
}

@Component({
  selector: 'app-activation-card-modal',
  templateUrl: './activation-card-modal.component.html',
  styleUrls: ['./activation-card-modal.component.scss']
})
export class ActivationCardModalComponent implements OnInit, OnDestroy {
  dialogData: DialogData
  userId: number;
  subscriptions = new Subscription();

  constructor(private _userService: UserService,
              private _snackBar: MatSnackBar,
              private _dialogRef: MatDialogRef<ActivationCardModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = data;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this._userService.sendEmail(this.dialogData.userId).subscribe(res => {
        },
        error => {
          this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
        }
      ));
  }

  onOKClick(): void {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
