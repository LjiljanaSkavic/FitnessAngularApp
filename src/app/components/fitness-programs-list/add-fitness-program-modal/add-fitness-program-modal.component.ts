import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FileService } from "../../../services/file.service";
import { MatDialogRef } from "@angular/material/dialog";
import { FitnessProgramRequest } from "../../../models/FitnessProgram";
import { CategoryService } from "../../../services/category.service";
import { forkJoin, of, Subscription } from "rxjs";
import { Category } from "../../../models/dto/Category";
import { UserStoreService } from "../../../services/user-store.service";
import { IFile } from "../../../models/IFile";
import { doubleValidator } from "../../../validators/DoubleValidator";
import { FitnessProgramService } from "../../../services/fitness-program.service";
import { InstructorDTO } from "../../../models/Instructor";
import { DIFFICULTY_LEVELS } from "../../../constants/difficulty-levels";

@Component({
    selector: 'app-add-fitness-program-modal',
    templateUrl: './add-fitness-program-modal.component.html',
    styleUrls: ['./add-fitness-program-modal.component.scss']
})
export class AddFitnessProgramModalComponent implements OnInit, OnDestroy {
    fitnessProgramForm: FormGroup;
    instructorForm: FormGroup;
    userId: number;

    selectedImages: File[] = [];
    imagePreviews: string[] = [];

    categoriesLoading = true;
    categories: Category[] = [];

    subs = new Subscription();

    fitnessProgramDTO = {} as FitnessProgramRequest;
    uploadedImages: IFile[] = [];

    instructorImage: File;
    instructorImagePreview: string;
    uploadedInstructorImage: IFile;

    contact: string;
    difficultyLevels = DIFFICULTY_LEVELS;

    constructor(private dialogRef: MatDialogRef<AddFitnessProgramModalComponent>,
                private _categoryService: CategoryService,
                private _userStoreService: UserStoreService,
                private _fileService: FileService,
                private _fitnessProgramService: FitnessProgramService) {
    }

    ngOnInit() {
        this.subs.add(this._categoryService.getAll().subscribe(res => {
            this.categories = res;
            this.categoriesLoading = false;

            this.initializeUserId();

            this.buildEmptyFitnessForm();
            this.buildEmptyInstructorForm();
        }));
    }

    initializeUserId() {
        const user = this._userStoreService.getLoggedInUser();
        if (user !== null) {
            this.userId = user.id;
            this.contact = user.email;
        }
    }

    buildEmptyFitnessForm() {
        this.fitnessProgramForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            price: new FormControl(null, Validators.required),
            difficultyLevel: new FormControl(null, Validators.required),
            duration: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            location: new FormControl(null, Validators.required),
            contactEmail: new FormControl(this.contact, [Validators.required, Validators.email]),
            category: new FormControl(null, Validators.required),
        });
    }

    buildEmptyInstructorForm() {
        this.instructorForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(100)]),
            height: new FormControl(null, [Validators.required, doubleValidator()]),
            weight: new FormControl(null, [Validators.required, doubleValidator()]),
            sex: new FormControl(null, Validators.required),
        });
    }

    onFileChange(event: any) {
        const files: FileList = event.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file: File = files[i];
                this.selectedImages.push(file);

                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    removeFitnessProgramImage(index: number) {
        this.selectedImages.splice(index, 1);
        this.imagePreviews.splice(index, 1);
    }

    uploadImagesAndPrepareFitnessProgram(): void {
        const uploadFitnessProgramObservables = this.selectedImages.map(image => {
            return this._fileService.uploadFile(image);
        });

        const uploadInstructorObservable = this.instructorImage ? this._fileService.uploadFile(this.instructorImage) : of(null);

        forkJoin([...uploadFitnessProgramObservables, uploadInstructorObservable]).subscribe((responses: any[]) => {
            const fitnessProgramResponses = responses.slice(0, uploadFitnessProgramObservables.length);
            const instructorResponse = responses[uploadFitnessProgramObservables.length];

            this.uploadedImages = fitnessProgramResponses;

            if (instructorResponse) {
                this.uploadedInstructorImage = instructorResponse;
            }

            this.populateFitnessProgram();

            this.selectedImages = [];
            this.imagePreviews = [];
        });
    }

    onDialogClose(): void {
        this.uploadImagesAndPrepareFitnessProgram();
    }

    populateFitnessProgram(): void {
        const instructor: InstructorDTO = {
            age: +this.instructorForm.get('age').value,
            firstName: this.instructorForm.get('firstName').value,
            height: +this.instructorForm.get('height').value,
            id: 0,
            imageId: this.uploadedInstructorImage.id,
            lastName: this.instructorForm.get('lastName').value,
            sex: this.instructorForm.get('sex').value === 'female',
            weight: +this.instructorForm.get('weight').value
        };

        this.fitnessProgramDTO = {
            categoryId: this.fitnessProgramForm.get('category').value,
            contactEmail: this.fitnessProgramForm.get('contact').value,
            description: this.fitnessProgramForm.get('description').value,
            difficultyLevel: +this.fitnessProgramForm.get('difficultyLevel').value,
            duration: this.fitnessProgramForm.get('duration').value,
            imageIds: this.uploadedImages.map(image => image.id),
            instructor: instructor,
            location: this.fitnessProgramForm.get('location').value,
            name: this.fitnessProgramForm.get('name').value,
            price: +this.fitnessProgramForm.get('price').value,
            isCompleted: false,
            isDeleted: false,
            appUserCreatorId: this.userId
        };

        this._fitnessProgramService.create(this.fitnessProgramDTO).subscribe(res => {
            this.dialogRef.close(res);
        })
    }

    onInstructorFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.instructorImage = file;

            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.instructorImagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    removeInstructorImage(): void {
        this.instructorImage = null;
        this.instructorImagePreview = null;
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
