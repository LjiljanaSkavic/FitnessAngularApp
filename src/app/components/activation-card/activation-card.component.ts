import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../user.service";

@Component({
  selector: 'app-activation-card',
  templateUrl: './activation-card.component.html',
  styleUrls: ['./activation-card.component.scss']
})
export class ActivationCardComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  userId: number;

  constructor(private _activatedRoute: ActivatedRoute,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription.add(this._activatedRoute.queryParams.pipe(switchMap(params => {
      this.userId = params['id'];
      return this._userService.sendEmail(this.userId);
    })).subscribe(res => {
        console.log('Email sent');
      },
      error => {
        console.log('Email is not sent')
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
