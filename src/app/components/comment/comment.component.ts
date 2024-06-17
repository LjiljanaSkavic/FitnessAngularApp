import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from "../../models/comment";
import { UserStoreService } from "../../services/user-store.service";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { EMPTY, Subscription, switchMap } from "rxjs";
import { CommentService } from "../../services/comment.service";
import { MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";
import { CommentEditRequest } from "../../models/dto/comment-request";
import { FileService } from "../../services/file.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() commentDeletedEmitter = new EventEmitter<number>();
  isMyComment = false;
  commentForm: FormGroup;
  isEditMode = false;
  imageURL: string;
  subscriptions = new Subscription();

  constructor(private _userStoreService: UserStoreService,
              private _commentService: CommentService,
              private _fileService: FileService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this._userStoreService.getIsLoggedIn()) {
      this.isMyComment = this._userStoreService.getLoggedInUser().id === this.comment.appUser.id;
    }
    this.commentForm = new FormGroup({
      myComment: new FormControl(this.comment.content)
    })
    this.commentForm.disable();

    if (!this.imageURL) {
      this.subscriptions.add(
        this._fileService.getFileById(this.comment.appUser.image.id).subscribe(imageBlob => {
          this.imageURL = URL.createObjectURL(imageBlob);
        }));
    }
  }

  onEditCommentClick() {
    this.isEditMode = true;
    this.commentForm.enable();
  }

  onDiscardEditCommentClick() {
    this.isEditMode = false;
    this.commentForm.get('myComment').setValue(this.comment.content);
    this.commentForm.disable();
  }

  onSaveEditCommentClick() {
    this.isEditMode = false;
    this.commentForm.disable();
    const commentEditRequest: CommentEditRequest = {
      content: this.commentForm.get('myComment').value,
      date: new Date()
    }

    this._commentService.editComment(this.comment.id, commentEditRequest).subscribe(res => {
      //TODO: Success
    });
  }

  onDeleteCommentClick() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete comment",
        text: "Are you sure that you want to delete this comment?"
      },
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().pipe(switchMap(result => {
      return result ? this._commentService.deleteById(this.comment.id) : EMPTY
    })).subscribe(res => {
      this.commentDeletedEmitter.emit(this.comment.id);
    })
  }
}
