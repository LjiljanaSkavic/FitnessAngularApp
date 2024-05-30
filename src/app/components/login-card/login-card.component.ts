import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import * as sha512 from 'js-sha512';
import { UserService } from "../../services/user.service";
import { UserStoreService } from "../../services/user-store.service";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivationCardComponent } from "../activation-card/activation-card.component";

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

  constructor(public dialog: MatDialog,
              private readonly _formBuilder: UntypedFormBuilder,
              private _router: Router,
              private _userService: UserService,
              private _userStoreService: UserStoreService,
              private _dialogRef: MatDialogRef<LoginCardComponent>) {
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
    const username = this.loginForm.get('username').value;
    const password = this.getPasswordHash(this.loginForm.get('password').value);
    this.subs.add(this._userService.findUserByUsernameAndPassword(username, password).subscribe(user => {
        if (user.activated) {
          this._userStoreService.isLoggedIn$.next(true);
          this._userStoreService.setUserAsLoggedIn(user);
          this._dialogRef.close();
          // this._router.navigateByUrl('exercises').catch(err => console.log(err));
        } else {
          this._dialogRef.close();
          this.dialog.open(ActivationCardComponent, {
              data: {
                userId: user.id
              },
              hasBackdrop: true,
              backdropClass: 'fitness-app-backdrop'
            }
          ).afterClosed().subscribe(() => {
          });
          // this._router.navigate(['profile-activation'], {queryParams: {id: user.id}}).catch(err => console.log(err));
        }
      },
      error => {
        //TODO: (Handle invalid login)
        console.log('error', error);
      }));
  }

  getPasswordHash(password: string): string {
    return sha512.sha512(password);
  }

  onSignUpClick($event: MouseEvent) {
    this._dialogRef.close();
    this.dialog.open(SignUpComponent, {
        hasBackdrop: true,
        backdropClass: 'fitness-app-backdrop'
      }
    ).afterClosed().subscribe(() => {
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
