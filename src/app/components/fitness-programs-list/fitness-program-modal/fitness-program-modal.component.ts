import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FileService } from "../../../services/file.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FitnessProgram, FitnessProgramRequest } from "../../../models/fitness-program";
import { CategoryService } from "../../../services/category.service";
import { forkJoin, of, Subscription } from "rxjs";
import { Category } from "../../../models/dto/category";
import { UserStoreService } from "../../../services/user-store.service";
import { FitnessAppFile } from "../../../models/fitness-app-file";
import { doubleValidator } from "../../../validators/double-validator";
import { FitnessProgramService } from "../../../services/fitness-program.service";
import { InstructorDTO } from "../../../models/instructor";
import { DIFFICULTY_LEVELS } from "../../../constants/difficulty-levels";
import { Attribute } from "../../../models/dto/attribute";
import { AttributeService } from "../../../services/attribute.service";
import { timeFormatValidator } from "../../../validators/time-format.validator";

interface ModalData {
  fitnessProgram: FitnessProgram;
  fitnessProgramImageUrls: string[];
  instructorImageUrl: string;
}

@Component({
  selector: 'app-fitness-program-modal',
  templateUrl: './fitness-program-modal.component.html',
  styleUrls: ['./fitness-program-modal.component.scss']
})
export class FitnessProgramModalComponent implements OnInit, OnDestroy {
  fitnessProgramForm: FormGroup;
  instructorForm: FormGroup;
  userId: number;

  isEditMode = false;
  selectedImages: File[] = [];
  fitnessProgramImageUrls: string[] = [];

  categoriesLoading = true;
  categories: Category[] = [];

  subscriptions = new Subscription();

  fitnessProgramDTO = {} as FitnessProgramRequest;
  uploadedImages: FitnessAppFile[] = [];

  instructorImage: File;
  instructorImagePreview: string;
  uploadedInstructorImage: FitnessAppFile;

  attributes: Attribute[] = [];
  dynamicFormControls: string[] = [];

  contact: string;
  difficultyLevels = DIFFICULTY_LEVELS;
  categoryDisabled = false;
  showLocation = false;
  location: string = ''

  currentFitnessProgramIds: number[] = [];

  constructor(private dialogRef: MatDialogRef<FitnessProgramModalComponent>,
              private _categoryService: CategoryService,
              private _userStoreService: UserStoreService,
              private _fileService: FileService,
              private _fitnessProgramService: FitnessProgramService,
              private _attributeService: AttributeService,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: ModalData) {
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.showLocation = !!this.data;

    if (this.data) {
      this.location = this.data.fitnessProgram.online ? 'Youtube link' : 'Location';
    }

    this.subscriptions.add(
      this._categoryService.getAll().subscribe(res => {
        this.categories = res;
        this.categoriesLoading = false;
        this.categoryDisabled = this.data !== null;

        this.initializeUserId();
        this.buildFitnessForm();
        this.buildInstructorForm();
      }));
  }

  initializeUserId() {
    const user = this._userStoreService.getLoggedInUser();
    if (user !== null) {
      this.userId = user.id;
      this.contact = user.email;
    }
  }

  buildFitnessForm(): void {
    if (!this.data) {
      this.fitnessProgramForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        difficultyLevel: new FormControl(null, Validators.required),
        duration: new FormControl(null, [Validators.required, timeFormatValidator()]),
        description: new FormControl(null, Validators.required),
        isOnline: new FormControl(null, Validators.required),
        location: new FormControl(null, Validators.required),
        contactEmail: new FormControl(this.contact, [Validators.required, Validators.email]),
        category: new FormControl(null, Validators.required),
      });
    } else {
      this.fitnessProgramForm = new FormGroup({
        name: new FormControl(this.data.fitnessProgram.name, Validators.required),
        price: new FormControl(this.data.fitnessProgram.price, Validators.required),
        difficultyLevel: new FormControl(this.data.fitnessProgram.difficultyLevel, Validators.required),
        duration: new FormControl(this.data.fitnessProgram.duration, [Validators.required, timeFormatValidator()]),
        description: new FormControl(this.data.fitnessProgram.description, Validators.required),
        isOnline: new FormControl(this.data.fitnessProgram.online ? 'online' : 'location', Validators.required),
        location: new FormControl(this.data.fitnessProgram.location, Validators.required),
        contactEmail: new FormControl(this.data.fitnessProgram.contactEmail, [Validators.required, Validators.email]),
        category: new FormControl(this.data.fitnessProgram.category.id, Validators.required),
      });

      this.currentFitnessProgramIds = this.data.fitnessProgram.images.map(image => image.id);
      this.fitnessProgramForm.get('category').disable();
      this.fitnessProgramImageUrls = Array.from(this.data.fitnessProgramImageUrls);
      this.buildAttributes();
    }

    this.trackIsOnlineChange();
  }

  buildAttributes(): void {
    this.dynamicFormControls = this.data.fitnessProgram.attributes.map(attribute => attribute.name);
    for (const controlName of this.dynamicFormControls) {
      const attribute = this.data.fitnessProgram.attributes.find(attribute => attribute.name === controlName);
      this.fitnessProgramForm.addControl(controlName,
        this._formBuilder.control(attribute.value, Validators.required));
    }
  }

  buildInstructorForm() {
    if (!this.data) {
      this.instructorForm = new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(100)]),
        height: new FormControl(null, [Validators.required, doubleValidator()]),
        weight: new FormControl(null, [Validators.required, doubleValidator()]),
        sex: new FormControl(null, Validators.required),
      });
    } else {
      this.instructorImagePreview = this.data.instructorImageUrl;
      this.instructorForm = new FormGroup({
        firstName: new FormControl(this.data.fitnessProgram.instructor.firstName, Validators.required),
        lastName: new FormControl(this.data.fitnessProgram.instructor.lastName, Validators.required),
        age: new FormControl(this.data.fitnessProgram.instructor.age, [Validators.required, Validators.min(18), Validators.max(100)]),
        height: new FormControl(this.data.fitnessProgram.instructor.height, [Validators.required, doubleValidator()]),
        weight: new FormControl(this.data.fitnessProgram.instructor.weight, [Validators.required, doubleValidator()]),
        sex: new FormControl(this.data.fitnessProgram.instructor.sex, Validators.required),
      });
    }
  }

  onFitnessProgramFileChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        this.selectedImages.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fitnessProgramImageUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeFitnessProgramImage(index: number) {
    if (this.data !== null) {
      this.currentFitnessProgramIds.splice(index, 1);
    }
    if (this.selectedImages.length > 0) {
      const indexOfUploaded = this.currentFitnessProgramIds.length - index;
      this.selectedImages.splice(indexOfUploaded, 1);
    }
    this.fitnessProgramImageUrls.splice(index, 1);
  }

  uploadEditedImagesAndSave(): void {
    const uploadFitnessProgramObservables = this.selectedImages.map(image => {
      return this._fileService.uploadFile(image);
    });

    const uploadInstructorObservable = this.instructorImagePreview !== this.data.instructorImageUrl ? this._fileService.uploadFile(this.instructorImage) : of(null);

    forkJoin([...uploadFitnessProgramObservables, uploadInstructorObservable]).subscribe((responses: any[]) => {
      const fitnessProgramResponses = responses.slice(0, uploadFitnessProgramObservables.length);
      const instructorResponse = responses[uploadFitnessProgramObservables.length];

      this.uploadedImages = fitnessProgramResponses;

      if (instructorResponse) {
        this.uploadedInstructorImage = instructorResponse;
      }

      this.populateFitnessProgram();
      this.fitnessProgramDTO.imageIds.push(...this.currentFitnessProgramIds);
      this._fitnessProgramService.update(this.data.fitnessProgram.id, this.fitnessProgramDTO).subscribe(res => {
        this.dialogRef.close(res);
      });
    });
  }

  uploadImagesAndSave(): void {
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

      this._fitnessProgramService.create(this.fitnessProgramDTO).subscribe(res => {
        this.dialogRef.close(res);
      })

      this.selectedImages = [];
      this.fitnessProgramImageUrls = [];
    });
  }

  onDialogClose(): void {
    if (this.data === null) {
      this.uploadImagesAndSave();
    } else {
      this.uploadEditedImagesAndSave();
    }
  }

  populateFitnessProgram(): void {
    const instructor: InstructorDTO = {
      age: +this.instructorForm.get('age').value,
      firstName: this.instructorForm.get('firstName').value,
      height: +this.instructorForm.get('height').value,
      id: this.data !== null ? this.data.fitnessProgram.instructor.id : 0,
      imageId: this.uploadedInstructorImage ? this.uploadedInstructorImage.id : this.data.fitnessProgram.instructor.image.id,
      lastName: this.instructorForm.get('lastName').value,
      sex: this.instructorForm.get('sex').value === 'female',
      weight: +this.instructorForm.get('weight').value
    };

    this.fitnessProgramDTO = {
      categoryId: this.fitnessProgramForm.get('category').value,
      contactEmail: this.fitnessProgramForm.get('contactEmail').value,
      creationDate: new Date(),
      description: this.fitnessProgramForm.get('description').value,
      difficultyLevel: +this.fitnessProgramForm.get('difficultyLevel').value,
      duration: this.fitnessProgramForm.get('duration').value,
      imageIds: this.uploadedImages.map(image => image.id),
      instructor: instructor,
      online: this.fitnessProgramForm.get('isOnline').value === 'online',
      location: this.fitnessProgramForm.get('location').value,
      name: this.fitnessProgramForm.get('name').value,
      price: +this.fitnessProgramForm.get('price').value,
      isCompleted: false,
      isDeleted: false,
      attributes: this.getAttributes(),
      appUserCreatorId: this.userId
    };
  }

  getAttributes(): Attribute[] {
    const attributes: Attribute[] = [];
    for (const attribute of this.attributes) {
      const control = this.fitnessProgramForm.get(attribute.name);
      if (control) {
        attributes.push({
          id: attribute.id,
          name: attribute.name,
          value: control.value
        });
      }
    }
    return attributes;
  }

  trackIsOnlineChange(): void {
    this.subscriptions.add(
      this.fitnessProgramForm.get('isOnline').valueChanges.subscribe(res => {
        this.showLocation = res !== null;

        if (res === 'online') {
          this.location = 'Youtube link';
          this.fitnessProgramForm.get('location').setValue('');
        } else if (res === 'location') {
          this.location = 'Location';
          this.fitnessProgramForm.get('location').setValue('');
        }
      }));
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

  onCategoryChange(event: any): void {
    const selectedCategoryId = event.value;

    this._attributeService.getAttributesFromCategory(selectedCategoryId).subscribe((response) => {
      this.attributes = response;
      this.dynamicFormControls = response.map(attribute => attribute.name);

      for (const controlName of this.dynamicFormControls) {
        this.fitnessProgramForm.addControl(controlName,
          this._formBuilder.control('', Validators.required));
      }
    });
  }

  removeInstructorImage(): void {
    this.instructorImage = null;
    this.instructorImagePreview = null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
