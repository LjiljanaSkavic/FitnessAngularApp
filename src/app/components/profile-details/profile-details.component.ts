import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { User } from "../../models/User";
import { Subscription, switchMap } from "rxjs";
import { UserStoreService } from "../../services/user-store.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FileService } from "../../services/file.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  isEditMode = false;
  profileForm: FormGroup;
  user: User = null;
  subs = new Subscription();
  selectedFile: File | null = null;
  selectedFileName = '';
  fileUrl: string | ArrayBuffer | null = null;
  fileUrlOriginal = null;

  constructor(private _userStoreService: UserStoreService,
              private _fileService: FileService,
              private _userService: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = this._userStoreService.getLoggedInUser();
    if (this.user === null) {
      //TODO: Handle error
    } else {
      this.buildProfileForm(this.user);
      this.getFile();
      this.selectedFileName = this.user.image.name;
    }
  }

  getFile(): void {
    this.subs.add(this._fileService.getFileById(this.user.image.id).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.fileUrl = reader.result;
          this.fileUrlOriginal = reader.result;
        };
      },
      error => {
        //TODO: Handle error
        console.error('Error retrieving file:', error);
      }
    ));
  }

  buildProfileForm(user: User): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      username: new FormControl(user.username, Validators.required),
      email: new FormControl(user.email, Validators.required),
      city: new FormControl(user.city, Validators.required),
      profilePicture: new FormControl(user.image.name)
    });
  }

  onEditProfilePageClick(): void {
    this.isEditMode = true;
    this.profileForm.enable();
  }

  onDiscardProfileChanges(): void {
    this.buildProfileForm(this.user);
    this.fileUrl = this.fileUrlOriginal;
    this.isEditMode = false;
    this.profileForm.disable();
  }

  onSaveProfileChanges(): void {
    console.log(this.user);
    const editedUser: User = {
      id: this.user.id,
      activated: true,
      city: this.profileForm.get('city').value,
      email: this.profileForm.get('email').value,
      firstName: this.profileForm.get('firstName').value,
      image: this.user.image,
      lastName: this.profileForm.get('lastName').value,
      username: this.user.username
    }
    if (this.user.image.name !== this.selectedFileName) {
      this.uploadNewPictureAndSaveUser(editedUser);
      this.isEditMode = false;
      this.profileForm.disable();
    } else {
      this.saveUser(editedUser);
      this.isEditMode = false;
      this.profileForm.disable();
    }
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
      this.profileForm.get('profilePicture').setValue(file.name);
    };
    reader.readAsDataURL(file);
  }

  uploadFile(): void {
    this._fileService.uploadFile(this.selectedFile)
      .subscribe(
        response => {
          this.fileUrl = response.path;
          //TODO: Message success
          console.log('File uploaded successfully:', response);
        },
        error => {
          //TODO: Error message
          console.error('Error uploading file:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  saveUser(user: User) {
    this._userService.editUser(user).subscribe(res => {
      console.log('res', res);
      this._userStoreService.setUserAsLoggedIn(res);
      this.user = this._userStoreService.getLoggedInUser();
      console.log('user', user)
    });
  }

  private uploadNewPictureAndSaveUser(user: User) {
    this._fileService.uploadFile(this.selectedFile).pipe(
      switchMap((response: any) => {
        console.log(response);
        return this._userService.editUser({...user, imageId: response.id});
      })
    ).subscribe(
      res => {
        //TODO: put this user in store
        this._userStoreService.setUserAsLoggedIn(res);
        this.user = this._userStoreService.getLoggedInUser();
      },
      error => {
        //TODO: Error message
        console.error('Error uploading file or saving user data:', error);
      }
    );
  }
}
