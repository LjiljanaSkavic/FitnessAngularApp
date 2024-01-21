import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit, OnDestroy {
  hidePassword = true;
  loginForm: FormGroup;
  invalidCredentials = false;
  subs = new Subscription();

  constructor(private readonly _formBuilder: UntypedFormBuilder,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.subs.add(this.loginForm.get('username')?.valueChanges.subscribe(value => this.invalidCredentials = false));
    this.subs.add(this.loginForm.get('password')?.valueChanges.subscribe(value => this.invalidCredentials = false));
  }

  buildForm() {
    this.loginForm = this._formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLoginClick($event: MouseEvent) {

  }

  onSignUpClick($event: MouseEvent) {
    this._router.navigateByUrl('sign-up').catch(err => console.log(err));
  }

  ngOnDestroy(): void {
  }
}
