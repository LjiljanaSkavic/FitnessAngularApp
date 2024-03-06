import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitnessProgram } from "../../../models/FitnessProgram";
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FitnessProgramService } from "../../../services/fitness-program.service";
import { FileService } from "../../../services/file.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Instructor } from "../../../models/Instructor";
import { BuyProgramComponent } from "../../buy-program/buy-program.component";
import { MatDialog } from "@angular/material/dialog";
import { UserStoreService } from "../../../services/user-store.service";
import { FitnessProgramPurchaseService } from "../../../services/fitness-program-purchase.service";

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

  constructor(private _activatedRoute: ActivatedRoute,
              private _fitnessProgramService: FitnessProgramService,
              private _fileService: FileService,
              private _userStoreService: UserStoreService,
              private _fitnessProgramPurchaseService: FitnessProgramPurchaseService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this._userStoreService.isLoggedIn) {
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
      contact: new FormControl(fitnessProgram.contact),
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
