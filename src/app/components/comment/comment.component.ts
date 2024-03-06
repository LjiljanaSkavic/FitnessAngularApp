import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from "../../models/Comment";
import { UserStoreService } from "../../services/user-store.service";
import { ConfirmationModalComponent } from "../../confirmation-modal/confirmation-modal.component";
import { EMPTY, switchMap } from "rxjs";
import { CommentService } from "../../services/comment.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;
    @Output() commentDeletedEmitter = new EventEmitter<number>();
    isMyComment = false;

    constructor(private _userStoreService: UserStoreService,
                private _commentService: CommentService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        console.log(this._userStoreService.getIsLoggedIn());
        if (this._userStoreService.getIsLoggedIn()) {
            this.isMyComment = this._userStoreService.getLoggedInUser().id === this.comment.id;
        }
    }

    onDeleteCommentClick() {
        this.dialog.open(ConfirmationModalComponent, {
            data: {
                title: "Delete comment",
                text: "Are you sure that you want to delete this comment?"
            }
        }).afterClosed().pipe(switchMap(result => {
            return result ? this._commentService.deleteById(this.comment.id) : EMPTY
        })).subscribe(res => {
            this.commentDeletedEmitter.emit(this.comment.id);
        })
    }
}
