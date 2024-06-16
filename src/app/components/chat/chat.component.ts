import { Component, OnInit } from '@angular/core';
import { AppUserShort } from "../../models/AppUser";
import { Subscription } from "rxjs";
import { UserStoreService } from "../../services/user-store.service";
import { ChatMessageService } from "../../services/chat-message.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  selectedUser: AppUserShort = {} as AppUserShort;
  userId = 0;
  subscription = new Subscription();

  constructor(private _userStoreService: UserStoreService,
              private _chatMessageService: ChatMessageService) {
  }

  ngOnInit(): void {
    if (this._userStoreService.getIsLoggedIn()) {
      this.userId = this._userStoreService.getLoggedInUser().id;
      this.subscription.add(this._chatMessageService.getUnreadMessagesByUserId(this.userId).subscribe(res => {
        console.log(res);
      }));
    }
  }

  onSelectUser(user: AppUserShort) {
    this.selectedUser = user;
  }
}
