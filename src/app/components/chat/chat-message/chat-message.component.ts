import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from "../../../models/dto/ChatMessage";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: ChatMessage = {} as ChatMessage;

  ngOnInit(): void {
  }
}
