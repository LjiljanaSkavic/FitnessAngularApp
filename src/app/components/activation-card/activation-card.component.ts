import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../user.service";
import { ERROR_HAS_OCCURRED_MESSAGE, snackBarConfig } from "../../shared/contants";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-activation-card',
  templateUrl: './activation-card.component.html',
  styleUrls: ['./activation-card.component.scss']
})
export class ActivationCardComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  userId: number;

  constructor(private _activatedRoute: ActivatedRoute,
              private _userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subscription.add(this._activatedRoute.queryParams.pipe(switchMap(params => {
      this.userId = params['id'];
      return this._userService.sendEmail(this.userId);
    })).subscribe(res => {
        this._snackBar.open('Email successfully sent, check your inbox!', "OK", snackBarConfig);
      },
      error => {
        this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
