import { Component } from '@angular/core';
import { AppUserShort } from "../../models/AppUser";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  selectedUser: AppUserShort = {} as AppUserShort;

  onSelectUser(user: AppUserShort) {
    this.selectedUser = user;
  }
}
