import { Component, EventEmitter, Output } from '@angular/core';
import { AppUser, AppUserShort, AppUserShortWithUnreadMessages } from "../../../models/AppUser";
import { Subscription } from "rxjs";
import { UserService } from "../../../services/user.service";
import { UserStoreService } from "../../../services/user-store.service";
import { FileService } from "../../../services/file.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Output() selectedUserEmitter = new EventEmitter<AppUserShort>();
  user: AppUser;
  activatedUsers: AppUserShortWithUnreadMessages[] = [];
  subscriptions = new Subscription();
  userImageMap: Map<number, string> = new Map();
  selectedUserId: number;

  constructor(private _userService: UserService,
              private _userStoreService: UserStoreService,
              private _fileService: FileService) {
  }

  ngOnInit(): void {
    if (this._userStoreService.getIsLoggedIn()) {
      this.user = this._userStoreService.getLoggedInUser();
      this.subscriptions.add(
        this._fileService.getFileById(this.user.image.id).subscribe(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          this.userImageMap.set(this.user.id, imageUrl);
          return imageUrl;
        })
      );
    }
    this.subscriptions.add(this._userService.getActiveUsers(this.user.id).subscribe(res => {
      this.activatedUsers = res.filter(user => user.id !== this.user.id);
    }));
  }

  getUrl(user: AppUserShort | AppUser): string {
    this.subscriptions.add(
      this._fileService.getFileById(user.image.id).subscribe(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        this.userImageMap.set(user.id, imageUrl);
        return imageUrl;
      })
    );
    return '';
  }

  selectUser(user: AppUserShortWithUnreadMessages): void {
    user.unreadMessages = 0;
    this.selectedUserEmitter.emit(user);
    this.selectedUserId = user.id;
  }
}
