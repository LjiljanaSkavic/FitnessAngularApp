import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import * as sha512 from 'js-sha512';
import { UserService } from "../../services/user.service";
import { UserStoreService } from "../../services/user-store.service";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivationCardModalComponent } from "../activation-card-modal/activation-card-modal.component";

@Component({
  selector: 'app-login-card-modal',
  templateUrl: './login-card-modal.component.html',
  styleUrls: ['./login-card-modal.component.scss']
})
export class LoginCardModalComponent implements OnInit, OnDestroy {
  hidePassword = true;
  loginForm: FormGroup;
  invalidCredentials = false;
  subscriptions = new Subscription();

  constructor(public dialog: MatDialog,
              private readonly _formBuilder: UntypedFormBuilder,
              private _userService: UserService,
              private _userStoreService: UserStoreService,
              private _dialogRef: MatDialogRef<LoginCardModalComponent>) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.subscriptions.add(
      this.loginForm.get('username')?.valueChanges.subscribe(value => this.invalidCredentials = false)
    );
    this.subscriptions.add(
      this.loginForm.get('password')?.valueChanges.subscribe(value => this.invalidCredentials = false)
    );
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
    this.subscriptions.add(
      this._userService.findUserByUsernameAndPassword(username, password).subscribe(
        (user) => {
          if (user.activated) {
            this._userStoreService.setUserAsLoggedIn(user);
            this._userStoreService.isLoggedIn$.next(true);
            this._dialogRef.close();
          } else {
            this._dialogRef.close();
            this.dialog.open(ActivationCardModalComponent, {
                data: {
                  userId: user.id
                },
                hasBackdrop: true,
                backdropClass: 'fitness-app-backdrop'
              }
            ).afterClosed().subscribe(() => {
            });
          }
        },
        (error) => {
          this.invalidCredentials = true;
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
    this.subscriptions.unsubscribe();
  }
}
