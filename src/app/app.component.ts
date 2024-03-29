import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { UserStoreService } from "./services/user-store.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ERROR_HAS_OCCURRED_MESSAGE, MESSAGE_SUCCESS, snackBarConfig } from "./shared/contants";
import { EMPTY, Subscription, switchMap } from "rxjs";
import { AppUser } from "./models/AppUser";
import { AdviceMessageModalComponent } from "./components/advice-message-modal/advice-message-modal.component";
import { DIALOG_RESPONSE } from "./confirmation-modal/confirmation-modal.component";
import { AdviceMessage } from "./models/AdviceMessage";
import { AdviceMessageService } from "./services/advice-message.service";

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

    constructor(private _userService: UserService,
                private _router: Router,
                private _elRef: ElementRef,
                private _snackBar: MatSnackBar,
                private _userStoreService: UserStoreService,
                private _adviceMessageService: AdviceMessageService,
                public dialog: MatDialog) {
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
        //TODO: try with history
        this._router.navigateByUrl(`news`).catch(err => console.log(err));

        this.user = this._userStoreService.getLoggedInUser();
        if (this.user !== null) {
            this._userStoreService.setUserAsLoggedIn(this.user);
        }
    }

    onToggleAccountMenuClick(): void {
        this.user === null ? this._router.navigateByUrl('login').catch(err => console.log(err)) : this.collapsed = !this.collapsed;
    }

    onFitnessAppClick(): void {
        this._router.navigateByUrl(`news`).catch(err => console.log(err));
    }

    onProfileDetailsClick() {
        this.collapsed = true;
        this._router.navigateByUrl(`profile-details/${this.user.id}`).catch(err => console.log(err));
    }

    onChangePasswordClick(): void {
        this.collapsed = true;
        this._router.navigateByUrl(`manage-password/${this.user.id}`).catch(err => console.log(err));
    }

    onLogOutClick(): void {
        this.user = this._userStoreService.getLoggedInUser();
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSendAdviceMessageClick() {
        this.dialog.open(AdviceMessageModalComponent,
        ).afterClosed().pipe(switchMap(message => {
                if (!!message && message !== DIALOG_RESPONSE.DISCARD) {
                    const adviceMessage: AdviceMessage = {
                        text: message,
                        isRead: false,
                        dateTime: new Date(),
                        appUserSender: this.user.id,
                    }

                    return this._adviceMessageService.sendMessage(adviceMessage)
                }
                return EMPTY;
            }
        )).subscribe((result) => {
                this._snackBar.open(MESSAGE_SUCCESS, "OK", snackBarConfig)
            },
            (err) => {
                this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig)
            });
    }
}
