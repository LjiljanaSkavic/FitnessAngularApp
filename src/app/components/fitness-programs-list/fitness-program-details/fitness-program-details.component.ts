import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitnessProgram } from "../../../models/fitness-program";
import { EMPTY, filter, forkJoin, Subscription, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FitnessProgramService } from "../../../services/fitness-program.service";
import { FileService } from "../../../services/file.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
  PurchaseFitnessProgramModalComponent
} from "../../purchase-fitness-program-modal/purchase-fitness-program-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { UserStoreService } from "../../../services/user-store.service";
import { FitnessProgramPurchaseService } from "../../../services/fitness-program-purchase.service";
import { CommentRequest } from "../../../models/dto/comment-request";
import { ERROR_HAS_OCCURRED_MESSAGE, snackBarConfig } from "../../../shared/contants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommentService } from "../../../services/comment.service";
import { ConfirmationModalComponent } from "../../confirmation-modal/confirmation-modal.component";
import { FitnessProgramModalComponent } from "../fitness-program-modal/fitness-program-modal.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-fitness-program-details',
  templateUrl: './fitness-program-details.component.html',
  styleUrls: ['./fitness-program-details.component.scss']
})
export class FitnessProgramDetailsComponent implements OnInit, OnDestroy {

  id: number;
  isLoading = true;
  fitnessProgram: FitnessProgram = {} as FitnessProgram;
  fitnessProgramForm: FormGroup;
  userId: number;
  location = '';
  fileUrl: string | ArrayBuffer | null = null;
  isLoggedIn = false;
  leaveCommentForm: FormGroup;
  isMyFitnessProgram: boolean = false;
  fitnessProgramImageUrls: string[] = [];
  instructorImageUrl: string = '';
  dynamicFormControls: string[] = [];
  subscriptions = new Subscription();


  constructor(private _activatedRoute: ActivatedRoute,
              private _fitnessProgramService: FitnessProgramService,
              private _fileService: FileService,
              private _userStoreService: UserStoreService,
              private _fitnessProgramPurchaseService: FitnessProgramPurchaseService,
              private _snackBar: MatSnackBar,
              private _commentService: CommentService,
              private _router: Router,
              private _formBuilder: FormBuilder,
              private _datePipe: DatePipe,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this._userStoreService.getIsLoggedIn()) {
      this.userId = this._userStoreService.getLoggedInUser().id;
      this.isLoggedIn = true;
    }

    this.getFitnessProgram();

    this.leaveCommentForm = new FormGroup(
      {
        commentContent: new FormControl('', Validators.required)
      });
  }

  getFitnessProgram(): void {
    this.subscriptions.add(
      this._activatedRoute.params.pipe(
        switchMap(params => {
          this.id = params['id'];
          return this._fitnessProgramService.getById(this.id);
        })).subscribe(res => {
        this.fitnessProgram = res;
        this.isMyFitnessProgram = this.userId === this.fitnessProgram.appUserCreatorId;
        this.buildFitnessForm(this.fitnessProgram);
        this.getAllImageUrls();
        this.getInstructorImageUrl();
        this.buildAttributes();
      }));
  }

  buildFitnessForm(fitnessProgram: FitnessProgram): void {
    if (fitnessProgram.online) {
      this.location = 'online';
    } else {
      this.location = 'Location';
    }

    const formattedCreationDate = this._datePipe.transform(fitnessProgram.creationDate, 'MMM d, y');
    this.fitnessProgramForm = new FormGroup({
      price: new FormControl(fitnessProgram.price),
      difficultyLevel: new FormControl(fitnessProgram.difficultyLevel),
      duration: new FormControl(fitnessProgram.duration),
      location: new FormControl(fitnessProgram.location),
      contactEmail: new FormControl(fitnessProgram.contactEmail),
      category: new FormControl(fitnessProgram.category.name),
      creationDate: new FormControl(formattedCreationDate),
      status: new FormControl(this.fitnessProgram.completed ? 'Completed' : 'Active')
    });

    this.fitnessProgramForm.disable();
  }

  getAllImageUrls(): void {
    const observables = this.fitnessProgram.images.map(image => {
      return this._fileService.getFileById(image.id);
    });

    forkJoin(observables).subscribe(res => {
      this.fitnessProgramImageUrls = res.map(resBlob => URL.createObjectURL(resBlob));
      this.isLoading = false;
    });
  }

  getInstructorImageUrl(): void {
    this.subscriptions.add(
      this._fileService.getFileById(this.fitnessProgram.instructor.image.id).subscribe(res => {
        this.instructorImageUrl = URL.createObjectURL(res);
      }));
  }

  onBuyProgramClick(): void {
    this.dialog.open(PurchaseFitnessProgramModalComponent, {
      data: {
        userId: this.userId,
        fitnessProgramId: this.id
      },
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().pipe(
      filter(res => res != null),
      switchMap(res => this._fitnessProgramPurchaseService.createPurchase(res))
    ).subscribe(
      res => {
        this._snackBar.open('Successfully purchased fitness program ' + this.fitnessProgram.name, "OK", snackBarConfig);
      },
      error => {
        this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
      }
    );
  }

  onPostCommentClick(): void {
    const commentContent = this.leaveCommentForm.get('commentContent')?.value;
    const commentRequest: CommentRequest = {
      content: commentContent,
      date: new Date(),
      fitnessProgramId: this.fitnessProgram.id,
      appUserId: this.userId
    }

    this.subscriptions.add(
      this._commentService.createComment(commentRequest).subscribe(
        newComment => {
          this.fitnessProgram.comments.push(newComment);
          this._snackBar.open('Comment posted successfully', "OK", snackBarConfig);
          this.leaveCommentForm.reset();
        },
        err => {
          this._snackBar.open(ERROR_HAS_OCCURRED_MESSAGE, "OK", snackBarConfig);
        }
      ));
  }

  commentDeleted(id: number): void {
    const index = this.fitnessProgram.comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
      this.fitnessProgram.comments.splice(index, 1);
    }
  }

  onDeleteFitnessProgramClick(): void {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete fitness program",
        text: "Are you sure that you want to delete this fitness program?"
      },
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().subscribe(result => {
      if (result) {
        this._fitnessProgramService.deleteById(this.fitnessProgram.id);
      }
    });
  }

  onCompleteFitnessProgramClick(): void {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Complete fitness program",
        text: "Are you sure that you want to set this fitness program as completed?"
      },
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().pipe(switchMap(result => {
      return result ? this._fitnessProgramService.setAsCompletedById(this.fitnessProgram.id) : EMPTY
    })).subscribe(res => {
      if (res) {
        this._router.navigateByUrl(`fitness-program`).catch(err => console.log(err));
      }
    });
  }

  buildAttributes(): void {
    this.dynamicFormControls = this.fitnessProgram.attributes.map(attribute => attribute.name);

    this.dynamicFormControls.forEach((controlName, index) => {
      const attributeValue = this.fitnessProgram.attributes[index].value;
      const control = this._formBuilder.control({value: attributeValue, disabled: true});
      this.fitnessProgramForm.addControl(controlName, control);
    });
  }


  onEditFitnessProgramClick(): void {
    this.dialog.open(FitnessProgramModalComponent, {
      data: {
        fitnessProgram: this.fitnessProgram,
        fitnessProgramImageUrls: this.fitnessProgramImageUrls,
        instructorImageUrl: this.instructorImageUrl
      },
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open("Fitness program successfully edited.", "OK", snackBarConfig);
        this.getFitnessProgram();
        this._router.navigateByUrl(`fitness-program/${result.id}`).catch(err => console.log(err));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
