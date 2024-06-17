import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { UserStoreService } from "../../services/user-store.service";
import { ERROR_HAS_OCCURRED_MESSAGE, snackBarConfig } from "../../shared/contants";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit, OnDestroy {
  userId: number;
  link: string;
  subscriptions = new Subscription();

  constructor(private _activatedRoute: ActivatedRoute,
              private _userService: UserService,
              private _userStoreService: UserStoreService,
              private _router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this._activatedRoute.queryParams.pipe(switchMap(params => {
        this.userId = params['id'];
        this.link = params['link']
        return this._userService.activateUser(this.userId, this.link);
      })).subscribe(user => {
          this._userStoreService.setUserAsLoggedIn(user);
          this._userStoreService.isLoggedIn$.next(true);
          this._router.navigateByUrl('exercises').catch(err => console.log(err));
          this._snackBar.open("You successfully logged in. Enjoy with GymGuru!", "OK", snackBarConfig);
        },
        error => {
          this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
