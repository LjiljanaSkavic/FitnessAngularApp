import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { UserStoreService } from "./services/user-store.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ERROR_HAS_OCCURRED_MESSAGE, MESSAGE_SUCCESS, snackBarConfig } from "./shared/contants";
import { Subscription } from "rxjs";
import { AppUser } from "./models/AppUser";
import { AdviceMessageModalComponent } from "./components/advice-message-modal/advice-message-modal.component";
import { AdviceMessageService } from "./services/advice-message.service";
import { ProfileDetailsComponent } from "./components/profile-details/profile-details.component";
import { ManagePasswordComponent } from "./components/manage-password/manage-password.component";
import { LoginCardComponent } from "./components/login-card/login-card.component";

export const DEFAULT_ANIMATION_DURATION = 100;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({height: '0', visibility: 'hidden'})),
      transition('false => true', animate(DEFAULT_ANIMATION_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_ANIMATION_DURATION + 'ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FitnessAngularApp';
  collapsed = true;
  user: AppUser = null;
  subscription = new Subscription();
  hasUnreadMessages = false;

  constructor(private _userService: UserService,
              private _router: Router,
              private _elRef: ElementRef,
              private _snackBar: MatSnackBar,
              private _userStoreService: UserStoreService,
              private _adviceMessageService: AdviceMessageService,
              public dialog: MatDialog,
              private _changeDetectorRef: ChangeDetectorRef,) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedToggleProfile = this._elRef.nativeElement.querySelector('.profile-details').contains(event.target);
    const clickedInsideProfileCard = this._elRef.nativeElement.querySelector('.quick-profile-view-card').contains(event.target);

    if (!clickedToggleProfile && !clickedInsideProfileCard && !this.collapsed) {
      this.collapsed = true;
    }
  }

  ngOnInit(): void {
    this.user = this._userStoreService.getLoggedInUser();
    if (this.user !== null) {
      this._userStoreService.setUserAsLoggedIn(this.user);
    }

    this._userStoreService.isLoggedIn$.subscribe(res => {
      if (res) {
        this.user = this._userStoreService.getLoggedInUser();
        this._changeDetectorRef.detectChanges();
        console.log('logged in', this.user);
      } else {
        this.user = null;
        this._changeDetectorRef.detectChanges();
        console.log('logged out', this.user);
      }
    });
  }

  onToggleAccountMenuClick(): void {
    if (this.user === null) {
      this.dialog.open(LoginCardComponent, {
          hasBackdrop: true,
          backdropClass: 'fitness-app-backdrop'
        }
      ).afterClosed().subscribe(() => {
      });
    } else {
      this.collapsed = !this.collapsed;
    }
  }

  onFitnessAppClick(): void {
    this._router.navigateByUrl(`fitness-news`).catch(err => console.log(err));
  }

  onProfileDetailsClick(): void {
    this.collapsed = true;
    this.dialog.open(ProfileDetailsComponent, {
        hasBackdrop: true,
        backdropClass: 'fitness-app-backdrop'
      }
    ).afterClosed().subscribe(() => {
    });
  }

  onChangePasswordClick(): void {
    this.collapsed = true;
    this.dialog.open(ManagePasswordComponent, {
        hasBackdrop: true,
        backdropClass: 'fitness-app-backdrop'
      }
    ).afterClosed().subscribe(() => {
    });
  }

  onLogOutClick(): void {
    if (this.user !== null) {
      this.subscription.add(this._userService.logoutUser(this.user.id).subscribe(res => {
        this.collapsed = true;
        this._userStoreService.setUserAsLoggedOut();
        this._userStoreService.isLoggedIn$.next(false);
        this._router.navigateByUrl('exercises').catch(err => console.log(err));
      }, err => {
        this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
      }));
    } else {
      this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
    }
  }

  onSendAdviceMessageClick(): void {
    this.dialog.open(AdviceMessageModalComponent, {
        data: {
          userId: this.user.id
        },
        hasBackdrop: true,
        backdropClass: 'fitness-app-backdrop'
      },
    ).afterClosed().subscribe(
      (res) => {
        res ? this._snackBar.open(MESSAGE_SUCCESS, "OK", snackBarConfig) : this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
      },
      () => {
        this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig)
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
