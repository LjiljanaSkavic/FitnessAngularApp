import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "./user.service";
import { LoginCardComponent } from "./components/login-card/login-card.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FitnessAngularApp';

  constructor(private _userService: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onToggleAccountMenuClick() {
    if (!this._userService.isLoggedIn) {
      this.dialog.open(LoginCardComponent).afterClosed().subscribe(res => {
        console.log(res);
      })
    }
  }

  onFitnessAppClick() {

  }

  ngOnDestroy(): void {
  }
}
