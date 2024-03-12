import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { DIALOG_RESPONSE } from "../../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-advice-message-modal',
  templateUrl: './advice-message-modal.component.html',
  styleUrls: ['./advice-message-modal.component.scss']
})
export class AdviceMessageModalComponent {

  messageControl = new FormControl('');
  adviceMessageFrom = new FormGroup({
    messageControl: this.messageControl,
  });
  protected readonly DIALOG_RESPONSE = DIALOG_RESPONSE;
}
