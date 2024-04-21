import { Component, EventEmitter, Output } from '@angular/core';
import { AppUserShort } from "../../../models/AppUser";
import { Subscription } from "rxjs";
import { UserService } from "../../../services/user.service";
import { UserStoreService } from "../../../services/user-store.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

    @Output() selectedUserEmitter = new EventEmitter<AppUserShort>();
    userId: number;
    activatedUsers: AppUserShort[] = [];
    subscriptions = new Subscription();

    constructor(private _userService: UserService,
                private _userStoreService: UserStoreService) {
    }

    ngOnInit() {
        if (this._userStoreService.getIsLoggedIn()) {
            this.userId = this._userStoreService.getLoggedInUser().id;
        }
        this.subscriptions.add(this._userService.getActiveUsers().subscribe(res => {
            this.activatedUsers = res.filter(user => user.id !== this.userId);
            console.log(res);
        }));
    }

    selectUser(user: AppUserShort): void {
        this.selectedUserEmitter.emit(user);
    }
}
