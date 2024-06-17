import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FileService } from "../../services/file.service";
import { AdviceMessageService } from "../../services/advice-message.service";
import { AdviceMessage } from "../../models/AdviceMessage";
import { forkJoin, switchMap } from "rxjs";

interface FilePreview {
  name: string;
  url: string | ArrayBuffer | null;
  file: File;
  isImage: boolean;
}

interface DialogData {
  userId: number,
}

@Component({
  selector: 'app-advice-message-modal',
  templateUrl: './advice-message-modal.component.html',
  styleUrls: ['./advice-message-modal.component.scss']
})
export class AdviceMessageModalComponent {

  messageControl = new FormControl('');
  filesControl = new FormControl([]);
  adviceMessageForm = new FormGroup({
    messageControl: this.messageControl,
    files: this.filesControl
  });
  files: FilePreview[] = [];
  dialogData: DialogData;

  constructor(private _dialogRef: MatDialogRef<AdviceMessageModalComponent>,
              private _fileService: FileService,
              private _adviceMessageService: AdviceMessageService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = data;
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.files.push({
            name: file.name,
            url: URL.createObjectURL(file),
            file: file,
            isImage: file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')
          });
          this.filesControl.setValue([...this.files]);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.filesControl.setValue([...this.files]);
  }

  onDiscardClick(): void {
    this._dialogRef.close(false);
  }

  onSendAdviceMessageClick(): void {
    const uploadedFiles: File[] = this.filesControl.value.map(file => file.file);
    const uploadAdviceMessageFilesObservable = uploadedFiles.map(file => {
      return this._fileService.uploadFile(file);
    });


    forkJoin(...uploadAdviceMessageFilesObservable).pipe(switchMap((result => {
      const fileIds = result.map(file => file.id);
      const adviceMessage: AdviceMessage = {
        text: this.messageControl.value,
        isRead: false,
        dateTime: new Date(),
        appUserSender: this.dialogData.userId,
        fileIds: fileIds
      }
      return this._adviceMessageService.sendMessage(adviceMessage)
    }))).subscribe(
      () => {
        this._dialogRef.close(true);
      },
      () => {
        this._dialogRef.close(false);
      });
  }
}
