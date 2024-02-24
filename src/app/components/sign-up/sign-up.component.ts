import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
