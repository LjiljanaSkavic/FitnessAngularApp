import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AppUserShort } from "../../models/AppUser";
import { ChatMessageService } from "../../services/chat-message.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  selectedUser: AppUserShort = {} as AppUserShort;
  subscription = new Subscription();

  constructor(private _userService: UserService,
              private _chatMessageService: ChatMessageService,) {
  }

  ngOnInit(): void {

    //TODO: Finish this: need user id

    // this.subscription.add(this._chatMessageService.getUnreadMessagesByUserId().subscribe(res => {
    //   console.log(res);
    // }))
  }

  onSelectUser(user: AppUserShort) {
    this.selectedUser = user;
  }
}
