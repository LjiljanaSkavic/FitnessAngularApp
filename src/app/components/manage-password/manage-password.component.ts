import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import * as sha512 from "js-sha512";
import { UserService } from "../../services/user.service";
import { UserStoreService } from "../../services/user-store.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent implements OnInit, OnDestroy {
  passwordForm: FormGroup;
  subs = new Subscription();
  oldPassword: string;
  oldPasswordInputHash = "";
  userId: number;

  constructor(private _userService: UserService,
              private _userStoreService: UserStoreService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.userId = this._userStoreService.getLoggedInUser().id; //TODO: Handle error here
    this.buildEmptyForm();
  }

  buildEmptyForm() {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
      repeatNewPassword: new FormControl(null, [Validators.required])
    });
  }

  onDiscardPasswordClick() {
    this._router.navigateByUrl(`exercises`).catch(err => console.log(err));
  }

  onSubmitPasswordClick() {
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const currentPasswordHash = this.getPasswordHash(currentPassword);

    const newPassword = this.passwordForm.get('newPassword')?.value;
    const newPasswordHash = this.getPasswordHash(newPassword);

    this._userService.changePassword(this.userId, currentPasswordHash, newPasswordHash).subscribe(
      () => {
        console.log('Password changed')
        this.passwordForm.reset();
        //TODO: navigate router
      },
      error => {
        console.error('Error changing password:', error);
      }
    );
  }

  getPasswordHash(password: string): string {
    return sha512.sha512(password);
  }

  hasOldPasswordError() {
    return undefined;
  }

  hasPasswordsMatchError() {
    return false;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
