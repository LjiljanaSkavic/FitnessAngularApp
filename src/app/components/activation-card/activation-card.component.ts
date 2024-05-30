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
  selector: 'app-activation-card',
  templateUrl: './activation-card.component.html',
  styleUrls: ['./activation-card.component.scss']
})
export class ActivationCardComponent implements OnInit, OnDestroy {
  dialogData: DialogData
  subscription = new Subscription();
  userId: number;

  constructor(private _userService: UserService,
              private _snackBar: MatSnackBar,
              private _dialogRef: MatDialogRef<ActivationCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = data;
  }

  ngOnInit(): void {
    this.subscription.add(this._userService.sendEmail(this.dialogData.userId).subscribe(res => {
        this._snackBar.open('Email successfully sent, check your inbox!', "OK", snackBarConfig);
      },
      error => {
        console.log(error);
        this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
      }
    ));
  }

  onOKClick(): void {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
