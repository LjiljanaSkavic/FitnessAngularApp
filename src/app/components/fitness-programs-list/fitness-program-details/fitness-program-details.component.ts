import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitnessProgram } from "../../../models/FitnessProgram";
import { EMPTY, Subscription, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FitnessProgramService } from "../../../services/fitness-program.service";
import { FileService } from "../../../services/file.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Instructor } from "../../../models/Instructor";
import { BuyProgramComponent } from "../../buy-program/buy-program.component";
import { MatDialog } from "@angular/material/dialog";
import { UserStoreService } from "../../../services/user-store.service";
import { FitnessProgramPurchaseService } from "../../../services/fitness-program-purchase.service";
import { CommentRequest } from "../../../models/dto/CommentRequest";
import { ERROR_HAS_OCCURRED_MESSAGE, MESSAGE_SUCCESS, snackBarConfig } from "../../../shared/contants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommentService } from "../../../services/comment.service";
import { ConfirmationModalComponent } from "../../../confirmation-modal/confirmation-modal.component";
import { DIFFICULTY_LEVELS } from "../../../constants/difficulty-levels";

@Component({
    selector: 'app-fitness-program-details',
    templateUrl: './fitness-program-details.component.html',
    styleUrls: ['./fitness-program-details.component.scss']
})
export class FitnessProgramDetailsComponent implements OnInit, OnDestroy {

    id: number;
    isLoading = true;
    isEditMode = false;
    fitnessProgram: FitnessProgram = {} as FitnessProgram;
    fitnessProgramForm: FormGroup;
    instructorForm: FormGroup;
    userId: number;

    subs = new Subscription();

    selectedFile: File | null = null;
    selectedFileName = '';
    fileUrl: string | ArrayBuffer | null = null;
    fileUrlOriginal = null;
    isLoggedIn = false;
    leaveCommentForm: FormGroup;
    isMyFitnessProgram: boolean = false;
    difficultyLevels = DIFFICULTY_LEVELS;

    constructor(private _activatedRoute: ActivatedRoute,
                private _fitnessProgramService: FitnessProgramService,
                private _fileService: FileService,
                private _userStoreService: UserStoreService,
                private _fitnessProgramPurchaseService: FitnessProgramPurchaseService,
                private _snackBar: MatSnackBar,
                private _commentService: CommentService,
                private _router: Router,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        if (this._userStoreService.getIsLoggedIn()) {
            this.userId = this._userStoreService.getLoggedInUser().id;
            this.isLoggedIn = true;
        }
        this.subs.add(this._activatedRoute.params.pipe(
            switchMap(params => {
                this.id = params['id'];
                return this._fitnessProgramService.getById(this.id);
            }),
            switchMap(res => {
                this.fitnessProgram = res;
                this.isMyFitnessProgram = this.userId === this.fitnessProgram.appUserCreatorId;
                console.log(this.isMyFitnessProgram);
                console.log(this.fitnessProgram.completed);
                this.buildFitnessForm(this.fitnessProgram);
                this.buildInstructorForm(this.fitnessProgram.instructor);
                return this._fileService.getFileById(this.fitnessProgram.images[0].id);
            })
        ).subscribe(data => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onloadend = () => {
                    this.fileUrl = reader.result;
                    this.fileUrlOriginal = reader.result;
                };
                this.isLoading = false;
            },
            error => {
                //TODO: Handle error
                console.error('Error retrieving file:', error);
            }
        ));

        this.leaveCommentForm = new FormGroup(
            {
                commentContent: new FormControl('', Validators.required)
            });
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (file) {
            this.displaySelectedFile(file);
        }
        this.selectedFile = event.target.files[0];
    }

    displaySelectedFile(file: File) {
        const reader = new FileReader();
        reader.onload = (event) => {
            this.fileUrl = event.target.result.toString();
            this.selectedFileName = file.name;
            // this.fitnessProgramForm.get('image').setValue(file.name); //add form for edit mode
        };
        reader.readAsDataURL(file);
    }

    buildFitnessForm(fitnessProgram: FitnessProgram) {
        this.fitnessProgramForm = new FormGroup({
            price: new FormControl(fitnessProgram.price),
            difficultyLevel: new FormControl(fitnessProgram.difficultyLevel),
            duration: new FormControl(fitnessProgram.duration),
            location: new FormControl(fitnessProgram.location),
            contactEmail: new FormControl(fitnessProgram.contactEmail),
            category: new FormControl(fitnessProgram.category.name),
        });
    }

    onBuyProgramClick() {
        this.dialog.open(BuyProgramComponent, {
            data: {
                userId: this.userId,
                fitnessProgramId: this.id
            }
        }).afterClosed().subscribe(res => {
            if (res != null) {
                this.subs.add(this._fitnessProgramPurchaseService.createPurchase(res).subscribe(res => {
                    console.log(res);
                    //TODO: Handle message
                }))
            }
        })
    }

    buildInstructorForm(instructor: Instructor) {
        this.instructorForm = new FormGroup({
            firstName: new FormControl(instructor.firstName),
            lastName: new FormControl(instructor.lastName),
            age: new FormControl(instructor.age),
            height: new FormControl(instructor.height),
            weight: new FormControl(instructor.weight),
            sex: new FormControl(instructor.sex),
        });
    }

    onPostCommentClick() {
        const commentContent = this.leaveCommentForm.get('commentContent')?.value;
        const commentRequest: CommentRequest = {
            content: commentContent,
            date: new Date(),
            fitnessProgramId: this.fitnessProgram.id,
            appUserId: this.userId
        }

        this.subs.add(
            this._commentService.createComment(commentRequest).subscribe(
                newComment => {
                    this.fitnessProgram.comments.push(newComment);
                    this._snackBar.open(MESSAGE_SUCCESS, "OK", snackBarConfig);

                    //TODO: push comments in the list of comments in program
                    this.leaveCommentForm.reset();
                },
                err => {
                    this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
                }
            ));
    }

    commentDeleted(id: number) {
        const index = this.fitnessProgram.comments.findIndex(comment => comment.id === id);
        if (index !== -1) {
            this.fitnessProgram.comments.splice(index, 1);
        }
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    onDeleteFitnessProgramClick() {
        this.dialog.open(ConfirmationModalComponent, {
            data: {
                title: "Delete fitness program",
                text: "Are you sure that you want to delete this fitness program?"
            }
        }).afterClosed().pipe(switchMap(result => {
            return result ? this._fitnessProgramService.deleteById(this.fitnessProgram.id) : EMPTY
        })).subscribe(res => {
            //TODO: Handle this
            this._router.navigateByUrl(`fitness-program`).catch(err => console.log(err));

            // this.commentDeletedEmitter.emit(this.comment.id);
        });
    }

    onCompleteFitnessProgramClick() {
        this.dialog.open(ConfirmationModalComponent, {
            data: {
                title: "Complete fitness program",
                text: "Are you sure that you want to set this fitness program as completed?"
            }
        }).afterClosed().pipe(switchMap(result => {
            return result ? this._fitnessProgramService.setAsCompletedById(this.fitnessProgram.id) : EMPTY
        })).subscribe(res => {
            if (res) {
                this._router.navigateByUrl(`fitness-program`).catch(err => console.log(err));
            }
        });
    }
}
