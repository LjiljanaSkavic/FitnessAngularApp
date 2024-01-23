import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';

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

  constructor(private _userService: UserService,
              private _router: Router,
              public dialog: MatDialog,
              private _elRef: ElementRef) {
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
  }

  onToggleAccountMenuClick() {
    this._router.navigateByUrl('login').catch(err => console.log(err))
  }

  onFitnessAppClick() {

  }

  onProfileDetailsClick() {

  }

  onChangePasswordClick() {

  }

  onLogOutClick() {

  }

  ngOnDestroy(): void {
  }
}
