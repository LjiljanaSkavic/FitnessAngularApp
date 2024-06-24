import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { UserService } from "../../services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as sha512 from "js-sha512";
import { UserRequest } from "../../models/dto/user-request";
import { FileService } from "../../services/file.service";
import { ActivationCardModalComponent } from "../activation-card-modal/activation-card-modal.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { LoginCardModalComponent } from "../login-card-modal/login-card-modal.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileName = '';
  fileUrl: string | ArrayBuffer | null = null;
  subscriptions = new Subscription();

  constructor(private _userService: UserService,
              private _fileService: FileService,
              private _dialogRef: MatDialogRef<SignUpComponent>,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.buildEmptyForm();
  }

  buildEmptyForm() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
      image: new FormControl(null),
    });
  }

  onLogInClick($event: Event) {
    this._dialogRef.close();
    this.dialog.open(LoginCardModalComponent, {
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().subscribe();
  }

  onSignUpClick($event: MouseEvent) {
    if (this.signUpForm.valid) {

      const user: UserRequest = {
        id: null,
        email: this.signUpForm.get('email')?.value,
        firstName: this.signUpForm.get('firstName')?.value,
        lastName: this.signUpForm.get('lastName')?.value,
        password: this.getPasswordHash(this.signUpForm.get('password')?.value),
        username: this.signUpForm.get('username')?.value,
        city: this.signUpForm.get('city')?.value,
        activated: false,
        imageId: null
      }


      if (this.signUpForm.get('image').value) {
        this.createUserWithImage(user);
      } else {
        this.createUserWithoutImage(user);
      }
    }
  }

  getPasswordHash(password: string): string {
    return sha512.sha512(password);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.displaySelectedFile(file);
    }
    this.selectedFile = event.target.files[0];
  }

  displaySelectedFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.fileUrl = event.target.result.toString();
      this.selectedFileName = file.name;
      this.signUpForm.get('image').setValue(file.name);
    };
    reader.readAsDataURL(file);
  }

  createUserWithImage(user: UserRequest) {
    this._fileService.uploadFile(this.selectedFile).pipe(
      switchMap((response: any) => {
        return this._userService.createUser({...user, imageId: response.id});
      })
    ).subscribe(
      res => {
        this._dialogRef.close();
        this.dialog.open(ActivationCardModalComponent, {
            data: {
              userId: res.id
            },
            hasBackdrop: true,
            backdropClass: 'fitness-app-backdrop'
          }
        ).afterClosed().subscribe(() => {
        });
      },
      error => {
        //TODO: Error message
        console.error('Error uploading file or saving user data:', error);
      }
    );
  }

  createUserWithoutImage(user: UserRequest): void {
    this.subscriptions.add(
      this._userService.createUser(user).subscribe(res => {
          this._dialogRef.close();
          this.dialog.open(ActivationCardModalComponent, {
              data: {
                userId: res.id
              },
              hasBackdrop: true,
              backdropClass: 'fitness-app-backdrop'
            }
          ).afterClosed().subscribe(() => {
          });
        },
        error => {
          //TODO: Error message
          console.error('Error uploading file or saving user data:', error);
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
