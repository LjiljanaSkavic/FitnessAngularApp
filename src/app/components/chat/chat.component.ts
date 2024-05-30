import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AppUserShort } from "../../models/AppUser";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  selectedUser: AppUserShort = {} as AppUserShort;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
  }

  onSelectUser(user: AppUserShort) {
    this.selectedUser = user;
  }
}
