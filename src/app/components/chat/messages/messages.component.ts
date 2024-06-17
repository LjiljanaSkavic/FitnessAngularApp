import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AppUserShort } from "../../../models/app-user";
import { UserStoreService } from "../../../services/user-store.service";
import { ChatService } from "../../../services/chat.service";
import { Subscription, switchMap } from "rxjs";
import { ChatMessage } from "../../../models/dto/chat-message";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnChanges {

  @Input() selectedUser: AppUserShort = {} as AppUserShort;
  @ViewChild('messagesWrapper') messagesWrapper: ElementRef;
  messages: ChatMessage[] = [];
  chatId: number;
  userId: number;
  sendMessageForm: FormGroup;

  subscriptions = new Subscription();

  constructor(private _userStoreService: UserStoreService,
              private _chatService: ChatService) {
  }

  scrollToBottom(): void {
    try {
      this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedUser'].firstChange) {
      this.subscriptions.add(
        this._chatService.getChatId(this.userId, changes['selectedUser'].currentValue.id)
          .pipe(
            switchMap(res => {
              this.chatId = res;
              return this._chatService.retrieveAndMarkMessagesAsRead(this.chatId, this.userId);
            })
          )
          .subscribe(messages => {
            this.messages = messages;
            try {
              setTimeout(() => {
                this.scrollToBottom();
              }, 200);
            } catch (err) {
              console.log(err);
            }
          })
      );
    }
  }

  ngOnInit(): void {
    if (this._userStoreService.getIsLoggedIn()) {
      this.userId = this._userStoreService.getLoggedInUser().id;
    }

    this.sendMessageForm = new FormGroup({
      messageText: new FormControl('', Validators.required)
    });
  }

  onSendMessageClick(): void {
    const newChatMessage: ChatMessage = {
      appUserSender: this.userId,
      appUserReceiver: this.selectedUser.id,
      chatId: this.chatId,
      dateTime: new Date(),
      id: 0,
      text: this.sendMessageForm.get('messageText').value
    }

    this._chatService.sendMessage(this.chatId, newChatMessage).subscribe(res => {
      this.sendMessageForm.get('messageText').setValue('');
      this.messages.push(res);


      try {
        setTimeout(() => {
          this.scrollToBottom();
        }, 200);
      } catch (err) {
        console.log(err);
      }
    })
  }

}
