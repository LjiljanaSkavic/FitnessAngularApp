import { Component } from '@angular/core';
import { AppUserShort } from "../../models/AppUser";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  selectedUser: AppUserShort = {} as AppUserShort;
  subscription = new Subscription();

  constructor() {
  }

  onSelectUser(user: AppUserShort) {
    this.selectedUser = user;
  }
}
