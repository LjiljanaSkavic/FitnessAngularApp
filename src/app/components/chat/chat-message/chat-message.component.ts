import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatMessage } from "../../../models/dto/ChatMessage";
import { FormControl, FormGroup } from "@angular/forms";
import { UserStoreService } from "../../../services/user-store.service";
import { FileService } from "../../../services/file.service";
import { AppUser, AppUserShort } from "../../../models/AppUser";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit, OnDestroy {

    @Input() message: ChatMessage = {} as ChatMessage;
    @Input() selectedUser: AppUserShort = {} as AppUserShort;
    imageURL = '';
    messageForm: FormGroup;
    user: AppUser;
    isMyMessage = false;

    subscriptions = new Subscription();

    constructor(private _userStoreService: UserStoreService,
                private _fileService: FileService) {
    }


    ngOnInit(): void {
        if (this._userStoreService.getIsLoggedIn()) {
            this.user = this._userStoreService.getLoggedInUser();
            this.isMyMessage = this.user.id === this.message.appUserSender;
        }

        if (!this.imageURL) {
            const userId = this.message.appUserSender === this.user.id ? this.user.id : this.selectedUser.image.id;
            this.subscriptions.add(
                this._fileService.getFileById(userId).subscribe(imageBlob => {
                    this.imageURL = URL.createObjectURL(imageBlob);
                })
            );
        }

        this.messageForm = new FormGroup({
            message: new FormControl(this.message.text),
        })

        this.messageForm.get('message').disable();
    }


    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
