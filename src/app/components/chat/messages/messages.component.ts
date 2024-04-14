import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppUserShort } from "../../../models/AppUser";
import { UserStoreService } from "../../../services/user-store.service";
import { ChatService } from "../../../services/chat.service";
import { Subscription, switchMap } from "rxjs";
import { ChatMessage } from "../../../models/dto/ChatMessage";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnChanges {

    @Input() selectedUser: AppUserShort = {} as AppUserShort;
    messages: ChatMessage[] = [];
    chatId: number;
    userId: number;
    sendMessageForm: FormGroup;

    subscriptions = new Subscription();

    constructor(private _userStoreService: UserStoreService,
                private _chatService: ChatService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['selectedUser'].firstChange) {
            this.subscriptions.add(
                this._chatService.getChat(this.userId, changes['selectedUser'].currentValue.id)
                    .pipe(
                        switchMap(res => {
                            this.chatId = res;
                            return this._chatService.getMessages(this.chatId);
                        })
                    )
                    .subscribe(messages => {
                        this.messages = messages;
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
        })

    }

    onSendMessageClick(): void {
        const newChatMessage: ChatMessage = {
            appUserCreator: this.userId,
            chatId: this.chatId,
            dateTime: new Date(),
            id: 0,
            text: this.sendMessageForm.get('messageText').value
        }

        this._chatService.sendMessage(this.chatId, newChatMessage).subscribe(res => {
            this.sendMessageForm.get('messageText').setValue('');
            this.messages.push(res);
        })
    }

}
