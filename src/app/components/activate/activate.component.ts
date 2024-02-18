import { Component } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../user.service";
import { UserStoreService } from "../../services/user-store.service";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent {
  subscription = new Subscription();
  userId: number;
  link: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _userService: UserService,
              private _userStoreService: UserStoreService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.subscription.add(this._activatedRoute.queryParams.pipe(switchMap(params => {
      this.userId = params['id'];
      this.link = params['link']
      return this._userService.activateUser(this.userId, this.link);
    })).subscribe(user => {
        console.log('User activated');
        this._userStoreService.isLoggedIn$.next(true);
        this._userStoreService.setUserAsLoggedIn(user);
        this._router.navigateByUrl('exercises').catch(err => console.log(err));
      },
      error => {
        console.log('User is not activated')
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
